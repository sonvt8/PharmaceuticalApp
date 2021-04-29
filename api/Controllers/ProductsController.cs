using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Helpers;
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
    public class ProductsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _unitOfWork.ProductRepository.GetProducts();
            return Ok(products);
        }

        [HttpGet("pagination")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsPagination([FromQuery] ProductParams productParams)
        {
            var products = await _unitOfWork.ProductRepository.GetProductsPagination(productParams);

            Response.AddPaginationHeader(products.CurrentPage, products.PageSize,
                products.TotalCount, products.TotalPages);

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
            //productCreateDto.Category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(productCreateDto.Category.Id);

            var productToCreate = _mapper.Map<Product>(productCreateDto);

            _unitOfWork.ProductRepository.AddProduct(productToCreate);

            await _unitOfWork.Complete();

            //var productToRead = _mapper.Map<ProductDto>(productToCreate);

            return CreatedAtAction("GetProductById", new { productId = productToCreate.Id }, productToCreate);
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

            var photos = product.PhotoProducts.ToList();

            foreach (var photo in photos)
            {
                if (photo.PublicId != null)
                {
                    var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                    if (result.Error != null) return BadRequest(result.Error.Message);
                }
                product.PhotoProducts.Remove(photo);
            }

            var reviews = product.Reviews;

            if (reviews != null)
            {
                foreach (var review in reviews.ToList())
                {
                    product.Reviews.Remove(review);
                }
            }

            _unitOfWork.ProductRepository.DeleteProduct(product);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete product");
        }

        [HttpPost("add-photo/{productId}")]
        public async Task<ActionResult<PhotoProductDto>> AddPhoto(IFormFile file, int productId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(productId);
            if (product == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new PhotoProduct
            {
                PhotoProductUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (product.PhotoProducts.Count == 0)
            {
                photo.IsMain = true;
            }

            product.PhotoProducts.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return _mapper.Map<PhotoProductDto>(photo);
            }

            return BadRequest("Problem addding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId, [FromQuery(Name = "id")] int productId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(productId);


            var photo = product.PhotoProducts.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = product.PhotoProducts.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId, [FromQuery(Name = "id")] int productId)
        {
            var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(productId);

            var photo = product.PhotoProducts.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            product.PhotoProducts.Remove(photo);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete the photo");
        }
    }
}
