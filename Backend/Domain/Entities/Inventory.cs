using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Inventory
    {
        public int id {  get; set; }
        [MaxLength(100)]
        public string name { get; set; }
        [MaxLength(250)]
        public string address {  get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public int IntialQty { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
