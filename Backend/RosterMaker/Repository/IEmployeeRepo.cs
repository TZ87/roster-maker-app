using RosterMaker.Model;

namespace RosterMaker.Repository;

public interface IEmployeeRepo
{ 
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeById(int employeeId);

        void Add(Employee employee);
        void Delete(int employeeId); 
   
        
}