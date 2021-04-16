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
    internal class FeedBackRepository : IFeedBackRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public FeedBackRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddFeedBack(FeedBack feedBack)
        {
            _context.FeedBacks.Add(feedBack);
        }

        public void DeleteFeedBack(FeedBack feedBack)
        {
            _context.FeedBacks.Remove(feedBack);
        }

        public async Task<bool> FeedBackExists(int feedBackId)
        {
            return await _context.FeedBacks.AnyAsync(f => f.Id == feedBackId);
        }

        public async Task<FeedBack> GetFeedBackByIdAsync(int feedBackId)
        {
            return await _context.FeedBacks.FindAsync(feedBackId);
        }

        public async Task<IEnumerable<FeedBackDto>> GetFeedBacks()
        {
            return await _context.FeedBacks
                .ProjectTo<FeedBackDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<FeedBackDto>> GetFeedBacksOfUserApproveAsync(int userId)
        {
            return await _context.FeedBacks
                .Where(f => f.AppUser.Id == userId && f.IsApproved == true)
                .ProjectTo<FeedBackDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<FeedBackDto>> GetFeedBacksOfUserAsync(int userId)
        {
            return await _context.FeedBacks
                .Where(f => f.AppUser.Id == userId)
                .ProjectTo<FeedBackDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<UserDto> GetUserOfAFeedBackAsync(int feedBackId)
        {
            var userId = await _context.FeedBacks.Where(f => f.Id == feedBackId).Select(f => f.AppUser.Id).FirstOrDefaultAsync();
            return await _context.Users
                .Where(u => u.Id == userId)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public void UpdateFeedBack(FeedBack feedBack)
        {
            _context.Entry(feedBack).State = EntityState.Modified;
        }
    }
}