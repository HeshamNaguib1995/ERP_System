using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;

namespace Application.UseCases.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IAuthData _authRepo; 
        public AuthService (IAuthData authRepo)
        {
            _authRepo = authRepo;
        }
        public string GetEmployeeDepartment(string username, string password)
        {
            return _authRepo.GetEmployeeDepartment(username, password);
        }

        public Task<bool> RevokeAllTokensAsync(Guid userId, string ipAddress)
        {
            throw new NotImplementedException();
        }

        public Task RevokeTokenAsync(string refreshToken, string ipAddress)
        {
            throw new NotImplementedException();
        }
    }
}
