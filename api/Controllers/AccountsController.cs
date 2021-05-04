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
        private readonly IMailService _mailService;

        public AccountsController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper, IPhotoService photoService, IUnitOfWork unitOfWork, IMailService mailService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _mailService = mailService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
        {

            if (await UserExist(registerDto.Email)) return BadRequest("Email is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            //Send Token Email
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Accounts", new { token, email = user.Email }, Request.Scheme);
            await _mailService.SendWelcomeEmailAsync(user.FullName, user.Email, confirmationLink);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new AccountDto
            {
                FullName = user.FullName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                 .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());
            if (user == null) return Unauthorized("Email is incorrect!");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Password is incorrect!");

            var isConfirmed = await _userManager.IsEmailConfirmedAsync(user);
            if (!isConfirmed)
            {
                return Unauthorized("Oopss! Make sure you clicked registration link in your mailbox");
            }

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

        //[Authorize]
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _userManager.Users
                .Include(p => p.PhotoUsers)
                .SingleOrDefaultAsync(u => u.Id == id);
            return _mapper.Map<UserDto>(user);
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _unitOfWork.UserRepository.GetUsersAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoUserDto>> AddPhotoUser(IFormFile file)
        {

            var currentUser = await _userManager.Users
                .Include(p => p.PhotoUsers)
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

        [Authorize]
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var currentUser = await _userManager.Users
                .Include(p => p.PhotoUsers)
                .SingleOrDefaultAsync(u => u.Id == User.GetUserId());

            var photo = currentUser.PhotoUsers.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = currentUser.PhotoUsers.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            var resultUser = await _userManager.UpdateAsync(currentUser);

            if (resultUser.Succeeded) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [Authorize]
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userManager.Users
                .Include(p => p.PhotoUsers)
                .SingleOrDefaultAsync(u => u.Id == User.GetUserId());

            var photo = user.PhotoUsers.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.PhotoUsers.Remove(photo);

            var resultUser = await _userManager.UpdateAsync(user);

            if (resultUser.Succeeded) return Ok();

            return BadRequest("Failed to delete the photo");
        }

        [HttpPost("recovery_email")]
        public async Task<ActionResult<ResetPasswordDto>> ForgotPassword(ForgotPasswordDto forgotPasswordModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Something wrong from your information");
            var user = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);
            if (user == null)
                return NoContent();

            //Send Token Email
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var recoveryLink = Url.Action(nameof(ResetPassword), "Accounts", new { token, email = user.Email }, Request.Scheme);
            await _mailService.SendForgotEmailAsync(user.FullName, user.Email, recoveryLink);

            return new ResetPasswordDto
            {
                Password = "",
                ConfirmPassword = "",
                Token = token,
                Email = forgotPasswordModel.Email
            };
        }

        [HttpGet("reset_password")]
        public async Task<IActionResult> ResetPassword(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("Error");
            var isConfirmed = await _userManager.IsEmailConfirmedAsync(user);
            if (!isConfirmed)
            {
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return Redirect("https://localhost:4200/reset-password");
                }
            }
            return Redirect("https://localhost:4200/reset-password");
        }

        [HttpPost("recovery_password")]
        public async Task<IActionResult> RenewPassword(ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Something wrong happens");
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return NoContent();

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (!resetPassResult.Succeeded)
            {
                foreach (var error in resetPassResult.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return NoContent();
            }

            return NoContent();
        }

        [HttpGet("confirm_email")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("Error");

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Redirect("https://localhost:4200/");
            }
            return BadRequest("Invalid token link");
        }
    }
}