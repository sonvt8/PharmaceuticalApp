using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class FeedBacksController: BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        public FeedBacksController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedBackDto>>> GetFeedBacks()
        {
            var feedBacks = await _unitOfWork.FeedBackRepository.GetFeedBacks();
            return Ok(feedBacks);
        }

        [HttpGet("pagination")]
        public async Task<ActionResult<IEnumerable<FeedBackDto>>> GetFeedBacksPagination([FromQuery] PaginationParams paginationParams)
        {
            var feedBacks = await _unitOfWork.FeedBackRepository.GetFeedBacksPagination(paginationParams);

            Response.AddPaginationHeader(feedBacks.CurrentPage, feedBacks.PageSize,
                feedBacks.TotalCount, feedBacks.TotalPages);

            return Ok(feedBacks);

        }

        [HttpGet("users/isapproved/{userId}")]
        public async Task<ActionResult<IEnumerable<FeedBackDto>>> GetFeedBacksOfAUserApproved(int userId)
        {
            var feedBacks = await _unitOfWork.FeedBackRepository.GetFeedBacksOfUserApproveAsync(userId);

            return Ok(feedBacks);
        }
        [HttpGet("users/{userId}")]
        public async Task<ActionResult<IEnumerable<FeedBackDto>>> GetFeedBacksOfAUser(int userId)
        {
            var feedBacks = await _unitOfWork.FeedBackRepository.GetFeedBacksOfUserAsync(userId);

            return Ok(feedBacks);
        }

        [HttpGet("{feedBackId}", Name = "GetFeedBackById")]
        public async Task<ActionResult<FeedBackDto>> GetFeedBackById(int feedBackId)
        {
            if (!await _unitOfWork.FeedBackRepository.FeedBackExists(feedBackId))
                return NotFound();

            var feedBack = await _unitOfWork.FeedBackRepository.GetFeedBackByIdAsync(feedBackId);

            var feedBackRead = _mapper.Map<FeedBackDto>(feedBack);

            return feedBackRead;
        }

        [HttpPost]
        public async Task<ActionResult> AddFeedBack(FeedBackCreateDto feedBackCreateDto)
        {
            feedBackCreateDto.AppUser = await _unitOfWork.UserRepository.GetUserByIdAsync(feedBackCreateDto.AppUser.Id);

            var feedBackToCreate = _mapper.Map<FeedBack>(feedBackCreateDto);

            _unitOfWork.FeedBackRepository.AddFeedBack(feedBackToCreate);

            await _unitOfWork.Complete();

            var feedBackToRead = _mapper.Map<FeedBackDto>(feedBackToCreate);

            return CreatedAtAction("GetFeedBackById", new { feedBackId = feedBackToRead.Id }, feedBackToRead);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateFeedBack(int id, FeedBack feedBackToUpdate)
        {
            if (id != feedBackToUpdate.Id)
            {
                return BadRequest();
            }
            if (!await _unitOfWork.FeedBackRepository.FeedBackExists(id)) return NotFound();

            _unitOfWork.FeedBackRepository.UpdateFeedBack(feedBackToUpdate);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update feedback");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFeedBack(int id)
        {
            var feedBack = await _unitOfWork.FeedBackRepository.GetFeedBackByIdAsync(id);

            if (feedBack == null) return NotFound();

            _unitOfWork.FeedBackRepository.DeleteFeedBack(feedBack);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete feedback");
        }
    }
}
