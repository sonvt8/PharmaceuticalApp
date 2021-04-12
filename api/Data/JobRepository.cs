using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Data
{
    internal class JobRepository : IJobRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public JobRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<Job> GetJobByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Job>> GetJobsAsync()
        {
            return await _context.Jobs.ToListAsync();
        }

        public void Update(Job job)
        {
            throw new System.NotImplementedException();
        }
    }
}