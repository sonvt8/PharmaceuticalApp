using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Helpers;
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
    //[Authorize(Policy = "RequireAdminRole")]
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public AdminController(UserManager<AppUser> userManager, IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.FullName)
                .Select(u => new
                {
                    u.Id,
                    Email = u.Email,
                    FullName = u.FullName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }
        [HttpGet("pagination/users-with-roles")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersWithRolesPagination([FromQuery] PaginationParams paginationParams)
        {
            var users = await _unitOfWork.UserRepository.GetUsersWithRolesPagination(paginationParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [HttpPost("edit-roles/{id}")]
        public async Task<ActionResult> EditRoles(int id, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        //[Authorize(Policy = "ModeratePhotoRole")]
        //[HttpGet("photos-to-moderate")]
        //public ActionResult GetPhotosForModeration()
        //{
        //    return Ok("Admins or moderators can see this");
        //}
        [HttpPut("users/{id}")]
        public async Task<ActionResult> UpdateUserByAdmin(int id, UserUpdateDto userUpdateDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);

            _mapper.Map(userUpdateDto, user);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpGet("users")]
        public async Task<ActionResult<UserDto>> GetUserDtoByAdmin()
        {
            var users = await _unitOfWork.UserRepository.GetUsersAsync();
            return Ok(users);
        }

        [HttpDelete("users/{id}")]
        public async Task<ActionResult> DeleteUserByAdmin(int id)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);

            if (user == null) return NotFound();

            var photos = user.PhotoUsers.ToList();

            foreach (var photo in photos)
            {
                if (photo.PublicId != null)
                {
                    var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                    if (result.Error != null) return BadRequest(result.Error.Message);
                }
                user.PhotoUsers.Remove(photo);
            }

            var feedbacks = user.FeedBacks.ToList();

            foreach (var feedBack in feedbacks)
            {
                user.FeedBacks.Remove(feedBack);
            }

            _unitOfWork.UserRepository.DeleteUser(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete user");
        }

        [HttpPost("add-photo/{userId}")]
        public async Task<ActionResult<PhotoUserDto>> AddPhoto(IFormFile file, int userId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);

            if (user == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new PhotoUser
            {
                PhotoUserUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.PhotoUsers.Count == 0)
            {
                photo.IsMain = true;
            }

            user.PhotoUsers.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return _mapper.Map<PhotoUserDto>(photo);
            }

            return BadRequest("Problem addding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId, [FromQuery] int id)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);

            var photo = user.PhotoUsers.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = user.PhotoUsers.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId, [FromQuery] int id)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);

            var photo = user.PhotoUsers.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.PhotoUsers.Remove(photo);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete the photo");
        }

    }
}
