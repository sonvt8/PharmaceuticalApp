using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    public class HistoryRepository : IHistoryRepository
    {
        private DataContext _context;
        private IMapper _mapper;
        public HistoryRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddHistory(AppliedJobHistory history)
        {
            _context.AppliedJobHistories.Add(history);
        }

        public async Task<IEnumerable<CareerProfileDto>> GetHistoriesById(int id)
        {
            return await _context.AppliedJobHistories
                .Where(x => x.AppUserId == id)
                .ProjectTo<CareerProfileDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public void UpdateHistory(AppliedJobHistory history)
        {
            _context.Entry(history).State = EntityState.Modified;
        }
    }
}
