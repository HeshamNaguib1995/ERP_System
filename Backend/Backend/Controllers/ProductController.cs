using System.Diagnostics.Eventing.Reader;
using Application.DTOs.Requests;
using Application.Interfaces;
using Application.UseCases.EmpService;
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
        [HttpDelete("DeleteProduct")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(id);
            if (product != null)
            { 
                _unitOfWork.Products.Delete(product);
                return Ok(true); 
            }
            else
            {
                return NotFound();
            }
        }

    }
}
