using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class UsersController: BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _photoService = photoService;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _unitOfWork.UserRepository.GetMembersAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _unitOfWork.UserRepository.GetMemberAsync(username);
            if (user == null) return NotFound();

            var currentUser = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
            var userRoles = await _userManager.GetRolesAsync(currentUser);

            foreach (var role in userRoles)
            {
                if (role == "Admin" || currentUser.UserName == username)
                    return Ok(user);
            }
            return BadRequest("Cannot see another user information");
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUserByMember(MemberUpdateDtoByMember memberUpdateDtoByMember)
        {
            var currentUser = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());

            _mapper.Map(memberUpdateDtoByMember, currentUser);

            _unitOfWork.UserRepository.UpdateUser(currentUser);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUserByAdmin(int id, MemberUpdateByAdmin memberUpdateByAdmin)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            _mapper.Map(memberUpdateByAdmin, user);

            _unitOfWork.UserRepository.UpdateUser(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

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
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            var currentUser = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());

            if (currentUser == user) return BadRequest("You can not delete yourself!");

            _unitOfWork.UserRepository.DeleteUser(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete user");
        }
    }
}
