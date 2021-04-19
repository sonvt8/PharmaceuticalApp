using api.DTOs;
using api.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IProductRepository
    {
        void AddProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(Product product);

        Task<IEnumerable<ProductDto>> GetProducts();
        Task<IEnumerable<ProductDto>> GetProductsOfCategoryAsync(int categoryId);
        Task<CategoryDto> GetCategoryOfAProductAsync(int productId);
        Task<ProductDto> GetProductDtoByIdAsync(int productId);
        Task<Product> GetProductByIdAsync(int productId);
        Task<bool> ProductExists(int productId);
    }
}