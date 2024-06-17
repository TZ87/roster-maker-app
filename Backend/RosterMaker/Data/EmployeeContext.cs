using Microsoft.EntityFrameworkCore;
using RosterMaker.Model;

namespace RosterMaker.Data;

public class EmployeeContext : DbContext
{
    public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
    {
        
    }

    public DbSet<Employee> Employees { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Employee>()
            .HasIndex(e => e.Id)
            .IsUnique();

        builder.Entity<Employee>()
            .HasData(
                new Employee
                {
                    Id = 1, Name = "Anett", Position = "Shopworker", Group = "B", IsPossibleNightShift = true
                },
                new Employee
                {
                    Id = 2, Name = "Anita", Position = "Shopworker", Group = "B", IsPossibleNightShift = false
                });
    }
}