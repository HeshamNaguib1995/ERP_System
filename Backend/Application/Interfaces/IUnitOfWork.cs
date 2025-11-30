using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IEmployeeRepository Employees { get; }
        IProductRepository Products { get; }
        IAttendanceRepository Attendances { get; }
        IAttendanceSummaryRepository AttendanceSummaries { get; }
        Task<int> SaveChangesAsync();

    }
}
