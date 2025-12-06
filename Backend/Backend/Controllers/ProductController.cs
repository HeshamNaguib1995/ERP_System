using System.Diagnostics.Eventing.Reader;
using Application.DTOs.Requests;
using Application.Interfaces;
using Application.UseCases.EmpService;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProductsAsync()
        {
            var Res = await _unitOfWork.Products.GetProductWithDetails();
            return Ok(Res);
        }
        [HttpGet("GetProductById/{id}")]
        public async Task<IActionResult> GetProductCategoriesAsync(int id)
        {
            var Res = await _unitOfWork.Products.GetByIdAsync(id);
            return Ok(Res);
        }
        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(id);
            if (product != null)
            { 
                _unitOfWork.Products.Delete(product);
                await _unitOfWork.SaveChangesAsync();
                var res = await _unitOfWork.Products.GetAllAsync();
                return Ok(true); 
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProductAsync(ProductUpdate product)
        {
            var res = await _unitOfWork.Products.UpdateProductAsync(product);
            return Ok(res);
        }
        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProductAsync(Product product)
        {
            await _unitOfWork.Products.AddAsync(product);
            await _unitOfWork.SaveChangesAsync();
            return Ok(true);
        }
        [HttpGet("GetProductBrands")]
        public async Task<IActionResult> GetBrandsAsync()
        {
            var Res = await _unitOfWork.Products.GetBrandsAsync();
            return Ok(Res);
        }
        [HttpGet("GetProductCategories")]
        public async Task<IActionResult> GetProductCategoriesAsync()
        {
            var Res = await _unitOfWork.Products.GetProductCategoriesAsync();
            return Ok(Res);
        }

    }
}
