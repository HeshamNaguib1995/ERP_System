using Application.UseCases.EmpService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }
        [HttpGet("GetEmployees")]
        public async Task<IActionResult> GetEmployeesAsync()
        {
            var Res = await employeeService.GetEmployees();
            return Ok(Res);
        }
    }
}
