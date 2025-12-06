using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class SalesOrder
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal RemainingAmount => TotalAmount - PaidAmount;

        // FK
        public int CustomerId { get; set; }

        // Navigation
        public Customer Customer { get; set; } = null!;
        public ICollection<SalesOrderItem> Items { get; set; } = new List<SalesOrderItem>();
    }
}
