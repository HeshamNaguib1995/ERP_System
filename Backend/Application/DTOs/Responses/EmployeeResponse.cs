using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.DTOs.Responses
{
    public class EmployeeResponse
    {
        public int id {  get; set; }
        public string ?FullName { get; set; }
        public string ?Address { get; set; }
        public string ?CityName { get; set; } 
        public float Salary { get; set; }
        public string ?BankName { get; set; }
        public string ?PositionName { get; set; }
        public string ?AccountNo { get; set; }
    }
}
