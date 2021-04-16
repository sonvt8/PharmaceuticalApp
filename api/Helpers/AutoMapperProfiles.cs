﻿using api.DTOs;
using api.Entities;
using api.Extensions;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();
            CreateMap<Review, ReviewDto>();
            CreateMap<ReviewDto, Review>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<PhotoUser, PhotoUserDto>();
            CreateMap<AppUser, UserDto>()
                .ForMember(des => des.PhotoUserUrl, opt => opt.MapFrom(src => src.PhotoUsers.FirstOrDefault(x => x.IsMain).PhotoUserUrl));
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<Job, JobDto>();
            CreateMap<JobDto, Job>();
            CreateMap<AppUser, CandidateDto>()
                .ForMember(des => des.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(des => des.Status, opt => opt.MapFrom(src => src.IsApproved.GetStatus()));
            CreateMap<CandidateCreateDto, AppUser>();
            CreateMap<FeedBack, FeedBackDto>()
                .ForMember(des => des.Status, opt => opt.MapFrom(src => src.IsApproved.GetStatus()));
            CreateMap<FeedBackCreateDto, FeedBack>();
        }
    }
}
