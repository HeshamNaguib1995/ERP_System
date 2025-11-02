using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        [MaxLength(120)]
        public string FullName { get; set; }
        [MaxLength(300)]
        public string Address { get; set; }
        public City City { get; set; }
        public int CityId { get; set; }
        public float Salary { get; set; }
        public Bank Bank { get; set; }
        public int BankId { get; set; }
        public Position Position { get; set; }
        public int? PositionId { get; set; }
        [MaxLength(200)]
        public string AccountNo {  get; set; }

    }
}
