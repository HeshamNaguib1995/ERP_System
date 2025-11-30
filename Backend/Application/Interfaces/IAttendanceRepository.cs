using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Responses;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IAttendanceRepository : IGenericRepository<Attendance>
    {
        Task<List<DailyAttendanceResponseDto>> GetDailyAttendace(DateTime Date);
    }
}
