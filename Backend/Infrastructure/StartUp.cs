using Application.Interfaces;
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
            // Dependency injection
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            return services;
        }
    }
}
