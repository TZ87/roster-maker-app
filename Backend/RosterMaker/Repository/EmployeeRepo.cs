using Microsoft.EntityFrameworkCore;
using RosterMaker.Data;
using RosterMaker.Model;

namespace RosterMaker.Repository;

public class EmployeeRepo: IEmployeeRepo
{
    private readonly EmployeeContext _context;

    public EmployeeRepo(EmployeeContext context)
    {
        _context = context;
    }

    public Task<List<Employee>> GetAllEmployees()
    {
       return _context.Employees.ToListAsync();
    }

    public Task<Employee?> GetEmployeeById(int employeeId)
    {
        return _context.Employees.SingleOrDefaultAsync(e => e.Id == employeeId);
    }

    public void Add(Employee employee)
    {
        _context.Add(employee);
        _context.SaveChangesAsync();
    }

    public void Delete(int employeeId)
    {
        _context.Remove(employeeId);
        _context.SaveChangesAsync();
    }
}