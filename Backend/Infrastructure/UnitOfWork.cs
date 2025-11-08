using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;

namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;

        public IEmployeeRepository Employees { get; }
        public IProductRepository Products { get; }
        public UnitOfWork(
            DataContext context,
            IEmployeeRepository employeeRepository,
            IProductRepository  ProductRepository)
        {
            _context = context;
            Employees = employeeRepository;
            Products = ProductRepository;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

}
