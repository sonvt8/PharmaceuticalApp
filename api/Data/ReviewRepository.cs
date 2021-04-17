using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    internal class ReviewRepository : IReviewRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public ReviewRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddReview(Review review)
        {
            _context.Reviews.Add(review);
        }

        public void DeleteReview(Review review)
        {
            _context.Reviews.Remove(review);
        }

        public async Task<ProductDto> GetProductOfAReviewAsync(int reviewId)
        {
            var productId = await _context.Reviews.Where(r => r.Id == reviewId).Select(r => r.Product.Id).FirstOrDefaultAsync();
            return await _context.Products
                .Where(p => p.Id == productId)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public async Task<Review> GetReviewByIdAsync(int reviewId)
        {
            return await _context.Reviews.FindAsync(reviewId);
        }

        public async Task<IEnumerable<ReviewDto>> GetReviews()
        {
            return await _context.Reviews
                .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<ReviewDto>> GetReviewsOfAProductApproveAsync(int productId)
        {
            return await _context.Reviews
                .Where(r => r.Product.Id == productId && r.IsApproved == true)
                .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<ReviewDto>> GetReviewsOfAProductAsync(int productId)
        {
            return await _context.Reviews
                .Where(r => r.Product.Id == productId)
                .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> ReviewExists(int reviewId)
        {
            return await _context.Reviews.AnyAsync(r=>r.Id == reviewId);
        }

        public void UpdateReview(Review review)
        {
            _context.Entry(review).State = EntityState.Modified;
        }
    }
}