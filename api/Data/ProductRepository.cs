using api.DTOs;
using api.Entities;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    internal class ProductRepository : IProductRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public ProductRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddProduct(Product product)
        {
            _context.Products.Add(product);
        }

        public void DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
        }

        public async Task<CategoryDto> GetCategoryOfAProductAsync(int productId)
        {
            var categoryId = await _context.Products.Where(p => p.Id == productId).Select(p => p.Category.Id).FirstOrDefaultAsync();
            return await _context.Categories
                .Where(c => c.Id == categoryId)
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public async Task<Product> GetProductByIdAsync(int productId)
        {
            return await _context.Products
                .Include(p => p.PhotoProducts)
                .Include(p => p.Category)
                .Where(p => p.Id == productId)
                .FirstOrDefaultAsync();
        }

        public async Task<ProductDto> GetProductDtoByIdAsync(int productId)
        {
            return await _context.Products
                .Include(p=>p.PhotoProducts)
                .Include(p => p.Category)
                .Where(p => p.Id == productId)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            return await _context.Products
                .Include(p => p.PhotoProducts)
                .Include(p => p.Category)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<ProductDto>> GetProductsOfCategoryAsync(int categoryId)
        {
            return await _context.Products
                .Include(p => p.PhotoProducts)
                .Include(p => p.Category)
                .Where(p => p.Category.Id == categoryId)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PagedList<ProductDto>> GetProductsPagination(ProductParams productParams)
        {
            var query = _context.Products
                .Include(p => p.PhotoProducts)
                .Include(p => p.Category)
                .AsQueryable();

            return await PagedList<ProductDto>.CreateAsync(query.ProjectTo<ProductDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    productParams.PageNumber, productParams.PageSize);
        }

        public async Task<bool> ProductExists(int productId)
        {
            return await _context.Products.AnyAsync(p => p.Id == productId);
        }

        public void UpdateProduct(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
    }
}