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

        public IAttendanceRepository Attendances { get; }
        public IAttendanceSummaryRepository AttendanceSummaries { get; }
        public UnitOfWork(
            DataContext context,
            IEmployeeRepository employeeRepository,
            IProductRepository  ProductRepository,
            IAttendanceRepository AttendanceRepository,
            IAttendanceSummaryRepository AttendanceSummaryRepository)
        {
            _context = context;
            Employees = employeeRepository;
            Products = ProductRepository;
            Attendances = AttendanceRepository;
            AttendanceSummaries = AttendanceSummaryRepository;
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
