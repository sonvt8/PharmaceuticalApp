using api.DTOs;
using api.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IJobRepository
    {
        void AddJob(Job job);
        void UpdateJob(Job job);
        void DeleteJob(Job job);
        Task<IEnumerable<JobDto>> GetJobsAsync();
        Task<JobDto> GetJobDtoByIdAsync(int jobId);
        Task<Job> GetJobByIdAsync(int jobId);
        Task<bool> JobExists(int jobId);
    }
}