﻿using api.DTOs;
using api.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IReviewRepository
    {
        void AddReview(Review review);
        void UpdateReview(Review review);
        void DeleteReview(Review review);

        Task<IEnumerable<ReviewDto>> GetReviews();
        Task<IEnumerable<ReviewDto>> GetReviewsOfAProductAsync(int productId);
        Task<IEnumerable<ReviewDto>> GetReviewsOfAProductApproveAsync(int productId);
        Task<Review> GetReviewByIdAsync(int reviewId);
        Task<Product> GetProductOfAReviewAsync(int reviewId);
        Task<bool> ReviewExists(int reviewId);
    }
}