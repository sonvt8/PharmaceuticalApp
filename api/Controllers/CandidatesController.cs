using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [Authorize(Policy = "RequireAdminRole")]
    public class CandidateController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public CandidateController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateDto>>> GetCandidate()
        {
            var users = await _unitOfWork.CandidateRepository.GetCandidatesAsync();
            return Ok(users);
        }

        [HttpGet("{id}", Name = "GetCandidate")]
        public async Task<ActionResult<CandidateDto>> GetCandidate(int id)
        {
            var currentUser = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
            if (currentUser == null) return NotFound();

            var candidate = await _unitOfWork.CandidateRepository.GetCandidateDtoByIdAsync(id);
            var candidateRead = _mapper.Map<CandidateDto>(candidate);

            return candidateRead;
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUserByCandidate(CandidateUpdateDtoByCandidate candidateUpdateDtoByCandidate)
        {
            var currentUser = await _unitOfWork.CandidateRepository.GetUserByIdAsync(User.GetUserId());

            _mapper.Map(candidateUpdateDtoByCandidate, currentUser);

            _unitOfWork.CandidateRepository.UpdateUser(currentUser);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUserByAdmin(int id, CandidateUpdateByAdmin candidateUpdateByAdmin)
        {
            var user = await _unitOfWork.CandidateRepository.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            _mapper.Map(candidateUpdateByAdmin, user);

            _unitOfWork.CandidateRepository.UpdateUser(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _unitOfWork.CandidateRepository.GetUserByUsernameAsync(User.GetUsername());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                PhotoUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }


            return BadRequest("Problem addding photo");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserByAdmin(int id)
        {
            var user = await _unitOfWork.CandidateRepository.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            var currentUser = await _unitOfWork.CandidateRepository.GetUserByIdAsync(User.GetUserId());

            if (currentUser == user) return BadRequest("You can not delete yourself!");

            _unitOfWork.CandidateRepository.DeleteUser(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete user");
        }
    }
}
