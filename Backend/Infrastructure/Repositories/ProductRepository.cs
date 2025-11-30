using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Migrations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context) { }
        public async Task<List<ProductResponseDto>> GetProductWithDetails()
        {
            var Res =  await _context.Products
                                     .Where(x=>x.IsDeleted == false)
                                     .Include(x => x.ProductCategory)
                                     .Include(x=>x.Brand)   
                                     .AsNoTracking()
                                     .ToListAsync(); 
            return ProductListMapping(Res);
        }
        public ProductResponseDto ProductMaping(Product Pr)
        {
            ProductResponseDto PrDto = new();
            PrDto.BrandName = Pr.Brand.Name;
            PrDto.Name = Pr.Name;
            PrDto.Price = Pr.Price;
            PrDto.ProductCategoryName = Pr.ProductCategory.Name;
            PrDto.Id = Pr.Id;
            PrDto.discount = Pr.discount;
            return PrDto;
        }
        public List<ProductResponseDto> ProductListMapping(List<Product> PrList)
        {
            List<ProductResponseDto> PrDtoList = new();
            foreach (Product Pr in PrList)
            {
                PrDtoList.Add(ProductMaping(Pr));
            }
            return PrDtoList;
        }

        public Task<bool> UpdateProductAsync(ProductUpdate product)
        {
            throw new NotImplementedException();
        }
    }
}
