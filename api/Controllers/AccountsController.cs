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
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class AccountsController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountsController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper, IPhotoService photoService, IUnitOfWork unitOfWork)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _photoService = photoService;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
        {

            if (await UserExist(registerDto.Email)) return BadRequest("Email is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new AccountDto
            {
                FullName = user.FullName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                 .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());
            if (user == null) return Unauthorized("Invalid Email");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new AccountDto
            {
                FullName = user.FullName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        private async Task<bool> UserExist(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }

        [Authorize]
        public async Task<ActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            var currentUser = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == User.GetUserId());

            _mapper.Map(userUpdateDto, currentUser);

            var result = await _userManager.UpdateAsync(currentUser);

            if (result.Succeeded) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult<UserDto>>GetUser(int id)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == id);
            return _mapper.Map<UserDto>(user);
        }

        [Authorize]
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoUserDto>> AddPhotoUser(IFormFile file)
        {

            var currentUser = await _userManager.Users
                .Include(p=>p.PhotoUsers)
                .SingleOrDefaultAsync(u => u.Id == User.GetUserId());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new PhotoUser
            {
                PhotoUserUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (currentUser.PhotoUsers.Count == 0)
            {
                photo.IsMain = true;
            }

            currentUser.PhotoUsers.Add(photo);

            var resultUser = await _userManager.UpdateAsync(currentUser);

            if (resultUser.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { id = currentUser.Id }, _mapper.Map<PhotoUserDto>(photo));
            }
            return BadRequest("Problem addding photo");
        }
    }
}
