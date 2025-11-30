using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Responses;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AttendanceSummaryRepository : GenericRepository<AttendanceMonthlySummary>, IAttendanceSummaryRepository
    {
        public AttendanceSummaryRepository(DataContext context) : base(context) { }
        public async Task<List<SummaryAttendanceDto>> GetSummaryData(int month, int year)
        {
            var Res = await _context.AttendanceMonthlySummaries
                                    .Select(x => new SummaryAttendanceDto
                                    {
                                        EmployeeId = x.EmployeeId,
                                        EmployeeName = x.Employee.FullName,
                                        Year = x.Year,
                                        Month = x.Month,
                                        TotalPresent = x.TotalPresent,
                                        TotalAbsent = x.TotalAbsent,
                                        TotalHoursWorked = x.TotalHoursWorked,
                                        TotalLate = x.TotalLate
                                     }).ToListAsync();
            return Res;
        }
    }
}
