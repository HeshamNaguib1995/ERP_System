using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Requests;

namespace Application.UseCases.AuthService
{
    public interface IAuthService
    {
        //Task<TokenResponse> AuthenticateAsync(SignInRequest request, string ipAddress);
        //Task<TokenResponse> RefreshTokenAsync(RefreshTokenRequest request, string ipAddress);
        Task RevokeTokenAsync(string refreshToken, string ipAddress);
        Task<bool> RevokeAllTokensAsync(Guid userId, string ipAddress);
        string GetEmployeeDepartment(string username, string password);
    }
}
