using api.DTOs;
using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface ICategoryRepository
    {
        void AddCategory(Category category);
        void UpdateCategory(Category category);
        void DeleteCategory(Category category);
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
        Task<CategoryDto> GetCategoryDtoByIdAsync(int categoryId);
        Task<Category> GetCategoryByIdAsync(int categoryId);
        Task<bool> CategoryExists(int categoryId);
    }
}
