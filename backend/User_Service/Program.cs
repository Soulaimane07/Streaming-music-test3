using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using User_Service.Data;  // Add this line for UserDbContext
using User_Service.Services;  // Add this line for UserService

var builder = WebApplication.CreateBuilder(args);

// Register DbContext with MySQL
builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("MySQLConnection"),
                     ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQLConnection"))));

// Register UserService
builder.Services.AddScoped<UserService>();

// Add controllers
builder.Services.AddControllers();

// Register Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
