using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Requests;
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

        public async Task<bool> Delete(int id)
        {
            var res = await _context.Employees.FindAsync(id);
            if (res != null)
            {
                _context.Employees.Remove(res);
                _context.SaveChanges();
                return true;
            }
            return false;
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

        public async Task<Employee> AddEmployee(Employee emp)
        {
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return emp;
        }
        public async Task<List<City>> GetCities()
        {
            return await _context.Cities.ToListAsync();
        }

        public async Task<List<Bank>> GetBanks()
        {
            return await _context.Banks.ToListAsync();
        }

        public async Task<List<Position>> GetPositions()
        {
            return await _context.Positions.ToListAsync();
        }

        public async Task<bool> Update(EmployeeUpdate emp)
        {
            var res = await _context.Employees.FindAsync(emp.Id);
            if (res != null)
             {
                try
                {
                    res.Salary = emp.Salary;    
                    res.AccountNo = emp.AccountNo;
                    res.BankId  = emp.BankId;
                    res.CityId = emp.BankId;
                    res.Address = emp.Address;
                    res.FullName = emp.FullName;
                    res.PositionId = emp.PositionId;
                    _context.Employees.Update(res);
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return false;
        }
    }
}
