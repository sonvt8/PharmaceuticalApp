using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class ReviewsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ReviewsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetReviews()
        {
            var reviews = await _unitOfWork.ReviewRepository.GetReviews();
            return Ok(reviews);
        }

        [HttpGet("pagination")]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetReviewsPagination([FromQuery] PaginationParams paginationParams)
        {
            var reviews = await _unitOfWork.ReviewRepository.GetReviewsPagination(paginationParams);

            Response.AddPaginationHeader(reviews.CurrentPage, reviews.PageSize,
                reviews.TotalCount, reviews.TotalPages);

            return Ok(reviews);

        }

        [HttpGet("products/{productId}")]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetReviewsOfAProduct(int productId)
        {
            var review = await _unitOfWork.ReviewRepository.GetReviewsOfAProductAsync(productId);

            return Ok(review);
        }

        [HttpGet("products/isapproved/{productId}")]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetReviewsOfAProductApprove(int productId)
        {
            var review = await _unitOfWork.ReviewRepository.GetReviewsOfAProductApproveAsync(productId);

            return Ok(review);
        }

        [HttpGet("{reviewId}", Name = "GetReviewById")]
        public async Task<ActionResult<ReviewDto>> GetReviewById(int reviewId)
        {
            if (!await _unitOfWork.ReviewRepository.ReviewExists(reviewId))
                return NotFound();

            var review = await _unitOfWork.ReviewRepository.GetReviewByIdAsync(reviewId);

            var reviewRead = _mapper.Map<ReviewDto>(review);

            return reviewRead;
        }


        [HttpPost]
        public async Task<ActionResult> AddReview(ReviewCreateDto reviewCreateDto)
        {
            //reviewCreateDto.Product = await _unitOfWork.ProductRepository.GetProductByIdAsync(reviewCreateDto.Product.Id);

            var reviewToCreate = _mapper.Map<Review>(reviewCreateDto);

            _unitOfWork.ReviewRepository.AddReview(reviewToCreate);

            await _unitOfWork.Complete();

            var reviewToRead = _mapper.Map<ReviewDto>(reviewToCreate);

            return CreatedAtAction("GetReviewById", new { reviewId = reviewToRead.Id }, reviewToRead);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReview(int id, Review reviewToUpdate)
        {
            if (id != reviewToUpdate.Id)
            {
                return BadRequest();
            }
            if (!await _unitOfWork.ReviewRepository.ReviewExists(id)) return NotFound();

            _unitOfWork.ReviewRepository.UpdateReview(reviewToUpdate);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update review");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReview(int id)
        {
            var review = await _unitOfWork.ReviewRepository.GetReviewByIdAsync(id);

            if (review == null) return NotFound();

            _unitOfWork.ReviewRepository.DeleteReview(review);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete review");
        }
    }
}
