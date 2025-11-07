using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Requests;
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

        public async Task<EmployeeResponse> AddEmployee(EmployeeAdd employee)
        {
            Employee emp = new Employee();
            emp.Address = employee.Address;
            emp.FullName = employee.FullName;
            emp.Salary = employee.Salary;
            emp.AccountNo = employee.AccountNo;
            emp.CityId = employee.CityId;
            emp.PositionId = employee.PositionId;
            emp.BankId = employee.BankId;
            var Res = await _employeeService.AddEmployee(emp);
            return await EmployeeMapping(Res);
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            return await _employeeService.Delete(id);
        }

        public async Task<EmployeeResponse> EmployeeMapping(Employee employee)
        {
            EmployeeResponse ep = new();
            ep.id = employee.Id;
            ep.Salary = employee.Salary;
            ep.Address = employee.Address;
            ep.FullName  = employee.FullName;
            ep.BankName = employee.Bank?.Name;
            ep.PositionName = employee.Position?.Name;
            ep.CityName = employee.City?.Name;
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

        public async Task<List<Bank>> GetBanks()
        {
            return await _employeeService.GetBanks();
        }

        public async Task<List<City>> GetCities()
        {
            return await _employeeService.GetCities();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var res = await _employeeService.GetById(id);
            return res;
        }

        public async Task<List<EmployeeResponse>> GetEmployees()
        {
            var Emps = await _employeeService.getData();

            return await employeeResponses(Emps);
        }

        public async Task<List<Position>> GetPositions()
        {
            return await _employeeService.GetPositions();
        }

        public async Task<bool> UpdateEmployee(EmployeeUpdate employee)
        {
            return await _employeeService.Update(employee);
        }
    }
}
