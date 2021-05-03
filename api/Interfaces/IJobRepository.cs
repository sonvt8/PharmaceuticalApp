using api.DTOs;
using api.Entities;
using api.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IJobRepository
    {
        void AddJob(Job job);
        void UpdateJob(Job job);
        void DeleteJob(Job job);

        Task<PagedList<Job>> GetJobsPagination(PaginationParams paginationParams);
        Task<IEnumerable<JobDto>> GetJobsDtoAsync();
        Task<IEnumerable<Job>> GetJobsAsync();
        Task<JobDto> GetJobDtoByIdAsync(int jobId);
        Task<Job> GetJobByIdAsync(int jobId);
        Task<bool> JobExists(int jobId);
    }
}