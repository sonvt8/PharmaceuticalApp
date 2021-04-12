using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class JobsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public JobsController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            return Ok(await _unitOfWork.JobRepository.GetJobsAsync());
        }
    }
}
