using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.DTOs.Responses
{
    public class DailyAttendanceResponseDto
    {
        public int id { get; set; }
        public int EmployeeId { get; set; } // Foreign Key
        public string EmployeeName { get; set; }
        public DateOnly DayDate { get; set; }
        public TimeOnly CheckInTime { get; set; }
        public TimeOnly CheckOutTime { get; set; }

    }
}
