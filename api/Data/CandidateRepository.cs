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
    public class CandidateRepository : ICandidateRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public CandidateRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddCandidate(Candidate candidate)
        {
            _context.Candidates.Add(candidate);
        }

        public async Task<bool> CandidateExists(int candidateId)
        {
            return await _context.Candidates.AnyAsync(c => c.Id == candidateId);
        }

        public void DeleteBook(Candidate candidate)
        {
            _context.Candidates.Remove(candidate);
        }

        public async Task<Candidate> GetCandidateByIdAsync(int candidateId)
        {
            return await _context.Candidates
                .Include(p => p.Photos)
                .Include(j => j.Job)
                .SingleOrDefaultAsync(c => c.Id == candidateId);
        }

        public async Task<CandidateDto> GetCandidateDtoByIdAsync(int candidateId)
        {
            return await _context.Candidates
                .Include(p => p.Photos)
                .Include(j => j.Job)
                .Where(x => x.Id == candidateId)
                .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Candidate>> GetCandidatesAsync()
        {
            return await _context.Candidates
                .Include(p => p.Photos)
                .Include(j => j.Job)
                .ToListAsync();
        }

        public async Task<IEnumerable<Candidate>> GetCandidatesByJobAsync(string jobName)
        {
            return await _context.Candidates
                .Include(p => p.Photos)
                .Include(j => j.Job)
                .Where(j => j.Job.JobName.ToLower() == jobName)
                .ToListAsync();
        }

        public async Task<IEnumerable<CandidateDto>> GetCandidatesDtoAsync()
        {
            return await _context.Candidates
                .Include(p => p.Photos)
                .Include(j => j.Job)
                .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<CandidateDto>> GetCandidatesDtoByJobAsync(string jobName)
        {
            return await _context.Candidates
               .Include(p => p.Photos)
               .Include(j => j.Job)
               .Where(j => j.Job.JobName.ToLower() == jobName)
               .ProjectTo<CandidateDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }

        public void UpdateBook(Candidate candidate)
        {
            _context.Entry(candidate).State = EntityState.Modified;
        }
    }
}
