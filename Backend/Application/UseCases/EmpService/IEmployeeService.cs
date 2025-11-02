using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.UseCases.EmpService
{
    public interface IEmployeeService
    {
        Task<List<EmployeeResponse>> GetEmployees();
        Task<List<EmployeeResponse>> employeeResponses(List<Employee> employee);
        Task<EmployeeResponse> EmployeeMapping(Employee employee);
    }
}
