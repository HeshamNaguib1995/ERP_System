using Application.DTOs.Responses;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AttendanceRepository : GenericRepository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(DataContext context) : base(context) { }
        public async Task<List<DailyAttendanceResponseDto>> GetDailyAttendace(DateTime Date)
        {
            var res = await _context.Attendances
                                    .Include(x => x.Employee)
                                    .Where(x=>x.DayDate == DateOnly.FromDateTime(Date))
                                    .ToListAsync();
            return (ProductListMapping(res));
        }
        public DailyAttendanceResponseDto ProductMaping(Attendance Att)
        {
            DailyAttendanceResponseDto DADto = new();
            DADto.EmployeeId = Att.EmployeeId;
            DADto.EmployeeName = Att.Employee.FullName;
            DADto.DayDate = Att.DayDate;
            DADto.CheckOutTime = Att.CheckOutTime;
            DADto.CheckInTime = Att.CheckInTime;
            DADto.id = Att.id;
            return DADto;
        }
        public List<DailyAttendanceResponseDto> ProductListMapping(List<Attendance> DADTO)
        {
            List<DailyAttendanceResponseDto> DADtoRes = new();
            foreach (Attendance Pr in DADTO)
            {
                DADtoRes.Add(ProductMaping(Pr));
            }
            return DADtoRes;
        }
    }
}
