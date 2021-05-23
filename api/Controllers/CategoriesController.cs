using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _unitOfWork.CategoryRepository.GetCategoriesAsync();

            return Ok(categories);
        }

        [HttpGet("{categoryId}", Name = "GetCategorById")]
        public async Task<ActionResult<CategoryDto>> GetCategorById(int categoryId)
        {
            if (!await _unitOfWork.CategoryRepository.CategoryExists(categoryId))
                return NotFound();

            return await _unitOfWork.CategoryRepository.GetCategoryDtoByIdAsync(categoryId);
        }

        [HttpPost]
        public async Task<ActionResult> AddCategory(CategoryDto categoryDto)
        {
            var categories = await _unitOfWork.CategoryRepository.GetCategoriesAsync();

            foreach (var category in categories)
            {
                if (category.CategoryName.ToLower() == categoryDto.CategoryName.Trim().ToLower())
                {
                    return BadRequest("Category Name already exists");
                }
            }
            var categoryCreate = _mapper.Map<Category>(categoryDto);

            _unitOfWork.CategoryRepository.AddCategory(categoryCreate);

            await _unitOfWork.Complete();

            var categoryRead = _mapper.Map<CategoryDto>(categoryCreate);

            return CreatedAtAction("GetCategorById", new { categoryId = categoryRead.Id }, categoryRead);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }
            if (!await _unitOfWork.CategoryRepository.CategoryExists(id)) return NotFound();

            _unitOfWork.CategoryRepository.UpdateCategory(category);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update category");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(id);

            if (category == null) return NotFound();

            var products = category.Products;

            if (products != null)
            {
                foreach (var product in products.ToList())
                {
                    category.Products.Remove(product);
                }
            }

            _unitOfWork.CategoryRepository.DeleteCategory(category);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete category");
        }

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult<PhotoCategoryDto>> AddPhoto(IFormFile file, int id)
        {
            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(id);
            if (category == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new PhotoCategory
            {
                PhotoCategoryUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (category.PhotoCategories.Count == 0)
            {
                photo.IsMain = true;
            }

            category.PhotoCategories.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return _mapper.Map<PhotoCategoryDto>(photo);
            }

            return BadRequest("Problem addding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId, [FromQuery(Name = "id")] int categoryId)
        {
            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(categoryId);


            var photo = category.PhotoCategories.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = category.PhotoCategories.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId, [FromQuery(Name = "id")] int categoryId)
        {
            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(categoryId);


            var photo = category.PhotoCategories.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            category.PhotoCategories.Remove(photo);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete the photo");
        }
    }
}
