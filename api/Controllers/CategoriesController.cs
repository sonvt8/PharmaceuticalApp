using api.DTOs;
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
    public class CategoriesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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
            if (categoryDto == null)
                return BadRequest("data cannot be empty");

            var categories = await _unitOfWork.CategoryRepository.GetCategoriesAsync();

            foreach (var category in categories)
            {
                if (category.CategoryName.ToLower() == categoryDto.CategoryName.Trim().ToLower())
                {
                    return BadRequest("Category Name already exists");
                }
            }

            Category categoryCreate = new Category();

            _mapper.Map(categoryDto, categoryCreate);

            _unitOfWork.CategoryRepository.AddCategory(categoryCreate);

            if (await _unitOfWork.Complete()) return CreatedAtAction("GetCategorById", new { categoryId = categoryDto.Id }, categoryDto);


            return BadRequest("Failed to update user");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, CategoryDto categoryDto)
        {

            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(id);

            if (category == null) return NotFound();

            _unitOfWork.CategoryRepository.UpdateCategory(category);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update category");
        }
    }
}
