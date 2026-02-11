using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Interfaces;
namespace Application.UseCases.AuthService
{
    public class LoginHandler
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtService;

        public LoginHandler(IUserRepository userRepository, IJwtTokenService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<LoginResponseDto> Handle(LoginRequestDto request)
        {
            var user = await _userRepository.GetUserByMail(request.Email)
                ?? throw new UnauthorizedAccessException("Invalid credentials");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials");

            var token = _jwtService.GenerateToken(user);

            return new LoginResponseDto(token);
        }
    }
}
