using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public CategoryRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddCategory(Category category)
        {
            _context.Categories.Add(category);
        }

        public async Task<bool> CategoryExists(int categoryId)
        {
            return await _context.Categories.AnyAsync(c => c.Id == categoryId);
        }

        public void DeleteCategory(Category category)
        {
            _context.Categories.Remove(category);
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
        {
            return await _context.Categories
                .Include(p=>p.PhotoCategories)
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<CategoryDto> GetCategoryDtoByIdAsync(int categoryId)
        {
            return await _context.Categories
                .Include(p => p.PhotoCategories)
                .Where(x => x.Id == categoryId)
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return await _context.Categories
                .Include(p => p.PhotoCategories)
                .Where(c => c.Id == categoryId)
                .FirstOrDefaultAsync();
        }

        public void UpdateCategory(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
        }
    }
}
