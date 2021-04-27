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
    internal class JobRepository : IJobRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public JobRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddJob(Job job)
        {
            _context.Jobs.Add(job);
        }

        public void DeleteJob(Job job)
        {
            _context.Jobs.Remove(job);
        }

        public async Task<Job> GetJobByIdAsync(int jobId)
        {
            return await _context.Jobs.FindAsync(jobId);
        }

        public async Task<JobDto> GetJobDtoByIdAsync(int jobId)
        {
            return await _context.Jobs
                .Where(x => x.Id == jobId)
                .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Job>> GetJobsAsync()
        {
            return await _context.Jobs
                //.ProjectTo<Job>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Task<IEnumerable<JobDto>> GetJobsDtoAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> JobExists(int jobId)
        {
            return await _context.Jobs.AnyAsync(j => j.Id == jobId);
        }

        public void UpdateJob(Job job)
        {
            _context.Entry(job).State = EntityState.Modified;
        }
    }
}