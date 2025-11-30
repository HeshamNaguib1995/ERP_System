using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;

namespace Infrastructure.Repositories
{
    public class AuthData : IAuthData
    {
        private readonly DataContext _context;
        public AuthData(DataContext context)
        {
            _context = context;
        }
        public string GetEmployeeDepartment(string Email, string password)
        {
            var res =  _context.Employees.Where(x => x.Email == Email && x.password == password)
                                        .Select(x => x.Department.Name).FirstOrDefault();

            if (res != null)
            {
                return res;
            }
            return null;
        }
    }
}
