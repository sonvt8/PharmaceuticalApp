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
    public class ProductsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _unitOfWork.ProductRepository.GetProducts();
            return Ok(products);
        }

        [HttpGet("categories/{categoryId}")]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetProductsOfACategory(int categoryId)
        {
            var products = await _unitOfWork.ProductRepository.GetProductsOfCategoryAsync(categoryId);

            return Ok(products);
        }


        [HttpGet("{productId}", Name = "GetProductById")]
        public async Task<ActionResult<ProductDto>> GetProductById(int productId)
        {
            if (!await _unitOfWork.ProductRepository.ProductExists(productId))
                return NotFound();

            var product = await _unitOfWork.ProductRepository.GetProductDtoByIdAsync(productId);

            return product;
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(ProductCreateDto productCreateDto)
        {
            productCreateDto.Category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(productCreateDto.Category.Id);

            var productToCreate = _mapper.Map<Product>(productCreateDto);

            _unitOfWork.ProductRepository.AddProduct(productToCreate);

            await _unitOfWork.Complete();

            var productToRead = _mapper.Map<ProductDto>(productToCreate);

            return CreatedAtAction("GetProductById", new { productId = productToRead.Id }, productToRead);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, Product productToUpdate)
        {
            if (id != productToUpdate.Id)
            {
                return BadRequest();
            }
            if (!await _unitOfWork.ProductRepository.ProductExists(id)) return NotFound();

            _unitOfWork.ProductRepository.UpdateProduct(productToUpdate);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update product");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(id);

            if (product == null) return NotFound();

            _unitOfWork.ProductRepository.DeleteProduct(product);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete product");
        }
    }
}
