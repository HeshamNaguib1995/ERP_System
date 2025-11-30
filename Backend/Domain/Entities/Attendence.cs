using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Entities
{
    public class Attendance
    {
        public int id { get; set; }
        public int EmployeeId { get; set; } // Foreign Key
        public DateOnly DayDate { get; set; }
        public TimeOnly CheckInTime { get; set; }
        public TimeOnly CheckOutTime { get; set; }

        public AttendanceStatus status { get; set; }
        public Employee Employee { get; set; } // EmployeeId Foreign Key
    }
}
