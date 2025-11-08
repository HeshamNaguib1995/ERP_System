using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        [MaxLength(150)]
        public string Name { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
