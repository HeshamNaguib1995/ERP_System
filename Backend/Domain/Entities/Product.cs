using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        public ProductCategory? ProductCategory { get; set; }
        public int ProductCategoryId { get; set; }
        public int IntialStock { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
