using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    //[Authorize(Policy = "RequireAdminRole")]
    public class JobsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public JobsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            var jobs = await _unitOfWork.JobRepository.GetJobsAsync();

            return Ok(jobs);
        }

        [HttpGet("pagination")]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobsPagination([FromQuery] PaginationParams paginationParams)
        {
            var jobs = await _unitOfWork.JobRepository.GetJobsPagination(paginationParams);

            Response.AddPaginationHeader(jobs.CurrentPage, jobs.PageSize,
                jobs.TotalCount, jobs.TotalPages);

            return Ok(jobs);

        }

        [HttpGet("{jobId}", Name = "GetJobById")]
        public async Task<ActionResult<JobDto>> GetJobById(int jobId)
        {
            if (!await _unitOfWork.JobRepository.JobExists(jobId))
                return NotFound();

            return await _unitOfWork.JobRepository.GetJobDtoByIdAsync(jobId);
        }

        [HttpPost]
        public async Task<ActionResult> AddJob(JobCreateDto jobDto)
        {
            var jobs = await _unitOfWork.JobRepository.GetJobsAsync();

            foreach (var job in jobs)
            {
                if (job.JobName.ToLower() == jobDto.JobName.Trim().ToLower())
                {
                    return BadRequest("Job Name already exists");
                }
            }
            var jobCreate = _mapper.Map<Job>(jobDto);

            _unitOfWork.JobRepository.AddJob(jobCreate);

            await _unitOfWork.Complete();

            var jobRead = _mapper.Map<JobDto>(jobCreate);

            return CreatedAtAction("GetJobById", new { jobId = jobRead.Id }, jobRead);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateJoby(int id, Job job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }
            if (!await _unitOfWork.JobRepository.JobExists(id)) return NotFound();

            _unitOfWork.JobRepository.UpdateJob(job);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update job");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJob(int id)
        {
            var job = await _unitOfWork.JobRepository.GetJobByIdAsync(id);

            if (job == null) return NotFound();

            _unitOfWork.JobRepository.DeleteJob(job);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete job");
        }
    }
}
