using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Interfaces;
using Domain.Entities;

namespace Application.UseCases.EmpService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepo;
        public EmployeeService(IEmployeeRepository employeeService)
        {
            _employeeRepo = employeeService;
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
            var Res = await _employeeRepo.AddEmployee(emp);
            return await EmployeeMapping(Res);
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            return await _employeeRepo.Delete(id);
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
            return await _employeeRepo.GetBanks();
        }

        public async Task<List<City>> GetCities()
        {
            return await _employeeRepo.GetCities();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var res = await _employeeRepo.GetById(id);
            return res;
        }

        public async Task<List<EmployeeResponse>> GetEmployees()
        {
            var Emps = await _employeeRepo.getData();

            return await employeeResponses(Emps);
        }

        public async Task<List<Position>> GetPositions()
        {
            return await _employeeRepo.GetPositions();
        }

        public async Task<bool> UpdateEmployee(EmployeeUpdate employee)
        {
            return await _employeeRepo.Update(employee);
        }
    }
}
