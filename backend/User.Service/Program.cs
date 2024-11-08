using User.Service.Repositories;
using Microsoft.EntityFrameworkCore;
using User.Service.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:3000")  // React app URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());  // If you need credentials like cookies or tokens
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

string postgresConnection = builder.Configuration.GetConnectionString("PostgresConnection");
builder.Services.AddScoped<UsersRepository>(_ => new UsersRepository(postgresConnection));

var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
