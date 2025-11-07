using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Requests;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> getData();
        Task<bool> Update(EmployeeUpdate emp);
        Task<bool> Delete(int id);
        Task<Employee> GetById(int id);
        Task<Employee> AddEmployee(Employee emp);
        Task<List<City>> GetCities();
        Task<List<Bank>> GetBanks();
        Task<List<Position>> GetPositions();
    }
}
