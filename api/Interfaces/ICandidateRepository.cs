using api.DTOs;
using api.Entities;
using api.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface ICandidateRepository
    {
        void AddCandidate(AppUser user);
        void UpdateCandidate(AppUser candidate);
        void DeleteCandidate(AppUser user);

        Task<PagedList<CandidateDto>> GetCandidatesPagination(PaginationParams paginationParams);
        Task<IEnumerable<CandidateDto>> GetCandidatesDtoAsync();
        Task<CandidateDto> GetCandidateDtoByIdAsync(int userId);

        Task<IEnumerable<CandidateDto>> GetCandidatesDtoIsApprovedAsync();
        Task<CandidateDto> GetCandidateDtoByIdIsApprovedAsync(int userId);

        Task<IEnumerable<CandidateDto>> GetCandidatesDtoByJobAsync(int jobId);

        Task<bool> CandidateExists(int candidateId);

        //Task<IEnumerable<Candidate>> GetCandidatesAsync();
        //Task<Candidate> GetCandidateByIdAsync(int candidateId);
        //Task<IEnumerable<Candidate>> GetCandidatesByJobAsync(int jobId);
    }
}
