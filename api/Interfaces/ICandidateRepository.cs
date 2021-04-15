using api.DTOs;
using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface ICandidateRepository
    {
        void AddCandidate(Candidate candidate);
        void UpdateBook(Candidate candidate);
        void DeleteBook(Candidate candidate);

        Task<IEnumerable<CandidateDto>> GetCandidatesDtoAsync();
        Task<CandidateDto> GetCandidateDtoByIdAsync(int candidateId);
        Task<IEnumerable<CandidateDto>> GetCandidatesDtoByJobAsync(string jobName);

        Task<IEnumerable<Candidate>> GetCandidatesAsync();
        Task<Candidate> GetCandidateByIdAsync(int candidateId);
        Task<bool> CandidateExists(int candidateId);
        Task<IEnumerable<Candidate>> GetCandidatesByJobAsync(string jobName);
    }
}
