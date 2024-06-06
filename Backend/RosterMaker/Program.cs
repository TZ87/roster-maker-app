using Microsoft.EntityFrameworkCore;
using RosterMaker.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
AddServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();


void AddDbContext()
{
    builder.Services.AddDbContext<EmployeeContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("RosterMakerConnection")));
}

void AddServices()
{
    builder.Services.AddDbContext<EmployeeContext>();
    
}
