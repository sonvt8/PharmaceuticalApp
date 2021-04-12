using api.Entities;
using api.Interfaces;
using AutoMapper;
using System.Collections.Generic;
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

        public Task<Review> GetReviewByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Review>> GetReviewsAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(Review review)
        {
            throw new System.NotImplementedException();
        }
    }
}