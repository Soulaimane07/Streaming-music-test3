using Microsoft.EntityFrameworkCore;
using User_Service.Data;  // Add this line for UserDbContext
using User_Service.Services;  // Add this line for UserService

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    // Default settings for HTTP/1.1 (For REST API)
    options.ListenAnyIP(5000, listenOptions =>
    {
        listenOptions.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http1;
    });

    // This applies HTTP/2 to gRPC endpoints
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http2;
    });
});

// Add services to the container.
builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("MySQLConnection"),
                     ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQLConnection"))));

builder.Services.AddScoped<UserService>();

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


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGrpc();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.MapControllers();
app.MapGrpcService<UserRPCService>();
app.Run();
