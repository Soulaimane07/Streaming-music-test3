using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using User_Service.Data;  // Add this line for UserDbContext
using User_Service.Services;  // Add this line for UserService
using Stripe;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("MySQLConnection"),
                     ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQLConnection"))));

builder.Services.AddScoped<UserService>();
builder.Services.AddControllers();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Specify your frontend origin
              .AllowAnyHeader()                    // Allow all headers
              .AllowAnyMethod()                    // Allow all HTTP methods
              .AllowCredentials();                 // Allow cookies and credentials
    });
});



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

StripeConfiguration.ApiKey = "sk_test_51QUADdAEkvVKIt6fnX5Gva7bRVrZnuXCTfwp8hl9GRHgAigr7hbWKVXTFOeR4842Ocj1KaxB9QfCoKLz8WZdczhQ00pNmb8Hfi";

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
