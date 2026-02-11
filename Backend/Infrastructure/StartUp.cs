using Application.Interfaces;
using Application.UseCases.AuthService;
using Application.UseCases.EmpService;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class StartUp
    {
        public static IServiceCollection addInfraStructureServices
            (this IServiceCollection services,
            IConfiguration config)

        {
            // DbContext Configration
             services.AddDbContext<DataContext>(Options =>
                   Options.UseSqlServer(config.GetConnectionString("DefaultConnectionString"), builder =>
                   {
                       builder.MigrationsHistoryTable("_Migrations");
                   })); 

            // Repository 
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IAttendanceRepository, AttendanceRepository>();  
            services.AddScoped<IAttendanceSummaryRepository, AttendanceSummaryRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();

            // services
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IAuthData, AuthData>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            services.AddScoped<LoginHandler>();

            return services;
        }
    }
}
