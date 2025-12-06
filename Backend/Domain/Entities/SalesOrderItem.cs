using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class SalesOrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; } // price at selling time
        public decimal Total => Quantity * UnitPrice;

        // FK
        public int SalesOrderId { get; set; }
        public int ProductId { get; set; }

        // Navigation
        public SalesOrder SalesOrder { get; set; } = null!;
        public Product Product { get; set; } = null!;
    }
}
