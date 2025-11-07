using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.UseCases.EmpService
{
    public interface IEmployeeService
    {
        Task<List<EmployeeResponse>> GetEmployees();
        Task<List<EmployeeResponse>> employeeResponses(List<Employee> employee);
        Task<EmployeeResponse> EmployeeMapping(Employee employee);
        Task<EmployeeResponse> AddEmployee(EmployeeAdd employee);
        Task<List<City>>  GetCities();
        Task<List<Bank>> GetBanks();
        Task<List<Position>> GetPositions();
        Task<Employee> GetEmployeeById(int id);
        Task<bool> UpdateEmployee(EmployeeUpdate employee);
        Task<bool> DeleteEmployee(int id);
    }
}
