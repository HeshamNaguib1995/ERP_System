using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> getData();
        Task<bool> Update(Employee emp);
        Task Delete(int id);
        Task<Employee> GetById(int id);
    }
}
