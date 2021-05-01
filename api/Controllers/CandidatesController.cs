using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    
    public class CandidatesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public CandidatesController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _photoService = photoService;
        }

        //[Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateDto>>> GetCandidate()
        {
            var candidates = await _unitOfWork.CandidateRepository.GetCandidatesDtoAsync();
            return Ok(candidates);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("{id}", Name = "GetCandidate")]
        public async Task<ActionResult<CandidateDto>> GetCandidate(int id)
        {
            var candidate = await _unitOfWork.CandidateRepository.GetCandidateDtoByIdAsync(id);
            return candidate;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("jobs/{jobId}")]
        public async Task<ActionResult<IEnumerable<CandidateDto>>> GetCandidatesByJob(int jobId)
        {
            if (!await _unitOfWork.JobRepository.JobExists(jobId))
                return NotFound();

            var candidates = await _unitOfWork.CandidateRepository.GetCandidatesDtoByJobAsync(jobId);

            return Ok(candidates);
        }

        [Authorize]
        [HttpPut()]
        public async Task<ActionResult> CreateCandidate(CandidateCreateDto candidateCreateDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == User.GetUserId());
            if (user == null) return NotFound();

            _mapper.Map(candidateCreateDto, user);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return NoContent();

            return BadRequest("Failed to update user");
        }

        

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserByAdmin(int id)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();

            var currentUser = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == User.GetUserId());

            if (currentUser == user) return BadRequest("You can not delete yourself!");

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded) return NoContent();

            return BadRequest("Failed to delete user");
        }
    }
}
