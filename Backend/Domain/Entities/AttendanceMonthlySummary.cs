using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class AttendanceMonthlySummary
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; } // Foreign Key 

        public int Year { get; set; }
        public int Month { get; set; }

        public int TotalPresent { get; set; }
        public int TotalAbsent { get; set; }
        public int TotalLate { get; set; }
        public double TotalHoursWorked { get; set; }

        public Employee Employee { get; set; } // EmployeeId Foreign Key
    }
}
