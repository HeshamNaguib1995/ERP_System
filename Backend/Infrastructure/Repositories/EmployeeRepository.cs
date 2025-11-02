using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Employee>> getData()
        {
            return await _context.Employees.
                                  Include(e=>e.Bank).
                                  Include(e=>e.Position).
                                  Include(e=>e.City).
                                  AsNoTracking().
                                  ToListAsync();
        }

        public async Task<bool> Update(Employee employee)
        {
            var res = await _context.Employees.FindAsync(employee.Id);
            if (res != null)
            {
                res.Salary = employee.Salary;
                res.AccountNo = employee.AccountNo;
                res.FullName = employee.FullName;
                res.AccountNo = employee.AccountNo;
                res.Address = employee.Address;
                res.CityId = employee.CityId;
                res.BankId = employee.BankId;
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task Delete(int id)
        {
            var res = await _context.Employees.FindAsync(id);
            if (res != null)
            {
                _context.Employees.Remove(res);
                _context.SaveChanges();
            }
        }

        public async Task<Employee> GetById(int id)
        {
            var res = await _context.Employees.FindAsync(id);
            if (res != null)
            {
                return res;
            }
            return null;
        }
    }
}
