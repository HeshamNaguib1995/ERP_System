using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.DTOs.Requests
{
    public class ProductUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProductCategoryId { get; set; }
        public string ProductCategoryName { get; set; }
        public decimal Price { get; set; }
        public decimal discount { get; set; }
        public string? ImageUrl { get; set; }
        public string? Discription { get; set; }
        public int BrandId { get; set; }
    }
}
