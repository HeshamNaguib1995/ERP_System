using Application.Interfaces;
using Application.UseCases.AuthService;
using Application.UseCases.EmpService;
using Infrastructure.Repositories;
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

            // services
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IAuthData, AuthData>();
            services.AddScoped<IAuthService, AuthService>();

            return services;
        }
    }
}
