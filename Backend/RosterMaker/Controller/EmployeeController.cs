using Microsoft.AspNetCore.Mvc;
using RosterMaker.Model;
using RosterMaker.Repository;

namespace RosterMaker.Controller;

[ApiController]
[Route("/api/[controller]/[action]")]

public class EmployeeController : ControllerBase
{
   private readonly IEmployeeRepo _employeeRepo;

   public EmployeeController(IEmployeeRepo employeeRepo)
   {
      _employeeRepo = employeeRepo;
   }

   [HttpGet]
   public ActionResult GetAllEmployees()
   {
      var respond = new { res = _employeeRepo.GetAllEmployees() };
      return Ok(respond);
   }
   
   [HttpGet]
   public ActionResult GetEmployeeById(int employeeId)
   {
      var respond = new { res = _employeeRepo.GetEmployeeById(employeeId) };
      return Ok(respond);
   }

   [HttpPost]
   public ActionResult AddEmployee(Employee employee)
   {
      try
      {
         if (employee == null)
         {
            return BadRequest("Please add a valid Employee");
         }

         _employeeRepo.Add(employee);
         var response = new { res = employee };
         return Ok(response);
      }

      catch (Exception e)
      {
         return StatusCode(500, "An error occured");
      }
   }

   [HttpDelete]
   public async Task<ActionResult<Employee>> DeleteEmployee(int employeeID)
   {
      try
      {
         var applicant = await _employeeRepo.GetEmployeeById(employeeID);

         if (applicant == null)
         {
            return NotFound($"No Employee found!");
         }

         _employeeRepo.Delete(employeeID);

         var response = new { res = $"Applicant {employeeID} has succesfully deleted" };


         return Ok(response);
      }
      catch (Exception ex)
      {
         return StatusCode(500, "An error occured");
      }
   }
}