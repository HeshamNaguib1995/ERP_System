using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {}
        public DbSet<Employee> Employees {  get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Position> Positions { get; set; }  
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<User> users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
