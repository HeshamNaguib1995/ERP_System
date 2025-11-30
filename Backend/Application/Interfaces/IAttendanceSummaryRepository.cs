using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IAttendanceSummaryRepository : IGenericRepository<AttendanceMonthlySummary>
    {
        Task<List<SummaryAttendanceDto>> GetSummaryData(int month , int year);
    }
}
