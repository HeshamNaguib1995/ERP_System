using Application.DTOs.Requests;
using Application.UseCases.EmpService;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.WebRequestMethods;

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
        [HttpPost("AddEmployee")]
        public async Task<IActionResult> AddEmployeesAsync(EmployeeAdd employee)
        {
                var Res = await employeeService.AddEmployee(employee);
                return Ok(Res);   
        }
        [HttpGet("Getcities")]
        public async Task<IActionResult> GetCitiesAsync()
        {
            var Res = await employeeService.GetCities();
            return Ok(Res);
        }

        [HttpGet("GetBanks")]
        public async Task<IActionResult> GetBanksAsync()
        {
            var Res = await employeeService.GetBanks();
            return Ok(Res);
        }
        [HttpGet("GetPositions")]
        public async Task<IActionResult> GetPositionsAsync()
        {
            var Res = await employeeService.GetPositions();
            return Ok(Res);
        }
        [HttpGet("GetEmployeeById")]
        public async Task<IActionResult> GetEmployeeByIdAsync(int id)
        {
            var Res = await employeeService.GetEmployeeById(id);
            return Ok(Res);
        }
        [HttpPut("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployeeAsync(EmployeeUpdate Emp)
        {
            var Res = await employeeService.UpdateEmployee(Emp);
            return Ok(Res);
        }
        [HttpDelete("DeleteEmployee")]
        public async Task<IActionResult> DeleteEmployeeAsync(int id)
        {
            var Res = await employeeService.DeleteEmployee(id);
            return Ok(Res);
        }
        
    }
}
