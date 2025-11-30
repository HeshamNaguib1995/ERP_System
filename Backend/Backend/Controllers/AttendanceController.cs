using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AttendanceController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("daily")]
        public async Task<IActionResult> GetProductsAsync(DateTime date)
        {
            var Res = await _unitOfWork.Attendances.GetDailyAttendace(date);
            return Ok(Res);
        }
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummaryDataAsync(int month , int year)
        {
            var Res = await _unitOfWork.AttendanceSummaries.GetSummaryData(month , year);
            return Ok(Res);
        }
    }
}
