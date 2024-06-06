using Microsoft.EntityFrameworkCore;
using RosterMaker.Model;

namespace RosterMaker.Data;

public class EmployeeContext : DbContext
{
    public DbSet<Employee> Employees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=localhost,1455;Database=RosterMaker;User Id=SA;Password=!151RosterMaker151!;Encrypt=false;", sqlOptions => sqlOptions.EnableRetryOnFailure());
    }

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