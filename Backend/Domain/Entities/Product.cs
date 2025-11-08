using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        [MaxLength(250)]
        public string Name { get; set; }
        public virtual ProductCategory? ProductCategory { get; set; }
        public int ProductCategoryId { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal discount { get; set; }
        [MaxLength(255)]
        public string? ImageUrl { get; set; }
        [MaxLength(2500)]
        public string? Discription { get; set; }
        public virtual Brand Brand { get; set; }
        public int BrandId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
    }
}
