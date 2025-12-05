using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IProductRepository :  IGenericRepository<Product>
    {
        Task<List<ProductResponseDto>> GetProductWithDetails();
        Task<bool> UpdateProductAsync(ProductUpdate product);
        Task<List<Brand>> GetBrandsAsync();
        Task<List<ProductCategory>> GetProductCategoriesAsync();
    }
}
