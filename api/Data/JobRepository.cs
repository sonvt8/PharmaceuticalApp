using api.DTOs;
using api.Entities;
using api.Helpers;
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

        public async Task<Job> GetJobDtoByIdAsync(int jobId)
        {
            return await _context.Jobs
                .Where(x => x.Id == jobId)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Job>> GetJobsAsync()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task<PagedList<Job>> GetJobsAvailablePagination(JobParams jobParams)
        {
            var query = _context.Jobs
                .AsQueryable();

            query = query.Where(u => u.Salary >= jobParams.MinSalary && u.Salary <= jobParams.MaxSalary);

            query = query.Where(u => u.IsAvailable == true);

            if (!string.IsNullOrEmpty(jobParams.Search))
            {
                query = query.Where(e => e.JobName.ToLower().Contains(jobParams.Search));
            }

            return await PagedList<Job>.CreateAsync(query.AsNoTracking(),
                    jobParams.PageNumber, jobParams.PageSize);
        }

        public async Task<IEnumerable<JobDto>> GetJobsDtoAsync()
        {
            return await _context.Jobs
                .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PagedList<Job>> GetJobsPagination(PaginationParams paginationParams)
        {
            var query = _context.Jobs
                .AsQueryable();

            if (!string.IsNullOrEmpty(paginationParams.Search))
            {
                query = query.Where(e => e.JobName.ToLower().Contains(paginationParams.Search));
            }

            return await PagedList<Job>.CreateAsync(query.AsNoTracking(),
                    paginationParams.PageNumber, paginationParams.PageSize);
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