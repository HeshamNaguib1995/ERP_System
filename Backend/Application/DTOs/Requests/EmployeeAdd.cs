using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Requests
{
    public class EmployeeAdd
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public float Salary { get; set; }
        public int BankId { get; set; }
        public int? PositionId { get; set; }
        public string AccountNo { get; set; }
    }
}
