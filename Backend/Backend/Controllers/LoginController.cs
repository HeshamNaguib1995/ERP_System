using Application.DTOs.Requests;
using Application.UseCases.AuthService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly LoginHandler _handler;
        public LoginController(IAuthService authService, LoginHandler handler)
        {
            _authService = authService;            _handler = handler;
        }
         

        [HttpPost("Authenticate")]
        public IActionResult Login([FromBody] SignInRequest request)
        {
            var Rs = _authService.GetEmployeeDepartment(request.Email, request.Password);
            if (Rs == null)
            {
              return NotFound();
            }
            return Ok( new { Name = Rs } );
        }
        [HttpPost("AuthLogin")]
        public async Task<IActionResult> AuthLogin([FromBody] LoginRequestDto request)
        {
            var res = await _handler.Handle(request);
            return Ok( res );
        }

    }
}
