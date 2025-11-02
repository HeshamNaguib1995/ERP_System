using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Responses;
using Application.Interfaces;
using Domain.Entities;

namespace Application.UseCases.EmpService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeService;
        public EmployeeService(IEmployeeRepository employeeService)
        {
            _employeeService = employeeService;
        }

        public async Task<EmployeeResponse> EmployeeMapping(Employee employee)
        {
            EmployeeResponse ep = new();
            ep.id = employee.Id;
            ep.Salary = employee.Salary;
            ep.Address = employee.Address;
            ep.FullName  = employee.FullName;
            ep.BankName = employee.Bank.Name;
            ep.PositionName = employee.Position?.Name;
            ep.CityName = employee.City.Name;
            ep.AccountNo = employee.AccountNo;
            return ep;
        }

        public async Task<List<EmployeeResponse>> employeeResponses(List<Employee> employees)
        {
            List <EmployeeResponse> ResponseResults = new();
            foreach (Employee emp in employees)
            {
                ResponseResults.Add(await EmployeeMapping(emp));
            }
            return ResponseResults;
        }

        public async Task<List<EmployeeResponse>> GetEmployees()
        {
            var Emps = await _employeeService.getData();

            return await employeeResponses(Emps);
        }

        
    }
}
