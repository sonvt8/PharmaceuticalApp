using api.DTOs;
using api.Entities;
using api.Helpers;
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
    public class CandidateRepository : ICandidateRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public CandidateRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddCandidate(AppUser user)
        {
            _context.Users.Add(user);
        }


        public async Task<bool> CandidateExists(int candidateId)
        {
            return await _context.Users.AnyAsync(c => c.Id == candidateId);
        }

        public void DeleteCandidate(AppUser user)
        {
            _context.Users.Remove(user);
        }

        public async Task<CandidateDto> GetCandidateDtoByIdAsync(int userId)
        {
            return await _context.Users
                .Include(p => p.PhotoUsers)
                .Include(j => j.Job)
                .Where(x => x.Id == userId && x.IsApplied == true)
                .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<CandidateDto> GetCandidateDtoByIdIsApprovedAsync(int userId)
        {
            return await _context.Users
                .Include(p => p.PhotoUsers)
                .Include(j => j.Job)
                .Where(x => x.Id == userId && x.IsApproved == true && x.IsApplied == true)
                .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<CandidateDto>> GetCandidatesDtoAsync()
        {
            return await _context.Users
                .Include(p => p.PhotoUsers)
                .Include(j => j.Job)
                .Where(x => x.IsApplied == true)
                .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<CandidateDto>> GetCandidatesDtoByJobAsync(int jobId)
        {
            return await _context.Users
               .Include(p => p.PhotoUsers)
               .Include(j => j.Job)
               .Where(u => u.Job.Id == jobId && u.IsApplied == true)
               .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }

        public async Task<IEnumerable<CandidateDto>> GetCandidatesDtoIsApprovedAsync()
        {
            return await _context.Users
                .Include(p => p.PhotoUsers)
                .Include(j => j.Job)
                .Where(u=>u.IsApproved==true && u.IsApplied == true)
                .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PagedList<CandidateDto>> GetCandidatesPagination(PaginationParams paginationParams)
        {
            var query = _context.Users
                .Include(p => p.PhotoUsers)
                .Include(j => j.Job)
                .AsQueryable();

            query = query.Where(e => e.IsApplied==true);

            if (!string.IsNullOrEmpty(paginationParams.Search))
            {
                query = query.Where(e => e.FullName.ToLower().Contains(paginationParams.Search));
            }

            return await PagedList<CandidateDto>.CreateAsync(query.ProjectTo<CandidateDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    paginationParams.PageNumber, paginationParams.PageSize);
        }

        public void UpdateCandidate(AppUser candidate)
        {
            _context.Entry(candidate).State = EntityState.Modified;
        }
    }
}
