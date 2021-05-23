using api.DTOs;
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
            CreateMap<Category, CategoryDto>()
                .ForMember(des => des.PhotoCategoryUrl, opt => opt.MapFrom(src => src.PhotoCategories.FirstOrDefault(x => x.IsMain).PhotoCategoryUrl));
            CreateMap<CategoryDto, Category>();
            CreateMap<Review, ReviewDto>();
                //.ForMember(des => des.ProductName, opt => opt.MapFrom(src => src.Product.ProductName));
            CreateMap<ReviewDto, Review>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<PhotoUser, PhotoUserDto>();
            CreateMap<AppUser, UserDto>()
                .ForMember(des => des.PhotoUserUrl, opt => opt.MapFrom(src => src.PhotoUsers.FirstOrDefault(x => x.IsMain).PhotoUserUrl));
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<Job, JobDto>();
            CreateMap<JobCreateDto, Job>();
            CreateMap<AppUser, CandidateDto>()
                .ForMember(des => des.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
               .ForMember(des => des.PhotoUserUrl, opt => opt.MapFrom(src => src.PhotoUsers.FirstOrDefault(x => x.IsMain).PhotoUserUrl));
            CreateMap<CandidateDto, AppUser>();
            CreateMap<CandidateCreateDto, AppUser>();
            CreateMap<FeedBack, FeedBackDto>();
                //.ForMember(des => des.Status, opt => opt.MapFrom(src => src.IsApproved.GetStatus()));
            CreateMap<FeedBackCreateDto, FeedBack>();
            CreateMap<Product, ProductDto>()
                //.ForMember(des => des.CategoryName, opt => opt.MapFrom(src => src.Category.CategoryName))
                .ForMember(des => des.PhotoProductUrl, opt => opt.MapFrom(src => src.PhotoProducts.FirstOrDefault(x => x.IsMain).PhotoProductUrl));
            CreateMap<ProductCreateDto, Product>();
            CreateMap<PhotoProduct, PhotoProductDto>();
            CreateMap<Download, DownloadDto>();
            CreateMap<AppliedJobHistory, CareerProfileDto>();
            CreateMap<PhotoCategory, PhotoCategoryDto>();               
        }
    }
}
