using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IProductRepository
    {
        Task<List<ProductResponseDto>> GetProductWithDetails();
    }
}
