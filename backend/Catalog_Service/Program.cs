using Catalog_Service.Data;
using Catalog_Service.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to use HTTP/1.1 for REST and HTTP/2 for gRPC
builder.WebHost.ConfigureKestrel(options =>
{
    // Default settings for HTTP/1.1 (For REST API)
    options.ListenAnyIP(5002, listenOptions =>
    {
        listenOptions.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http1;
    });

    // This applies HTTP/2 to gRPC endpoints
    options.ListenAnyIP(5003, listenOptions =>
    {
        listenOptions.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http2;
    });
});

// Register CatalogDbContext with MongoDB connection string
builder.Services.AddSingleton<CatalogDbContext>(serviceProvider =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    return new CatalogDbContext(connectionString);
});

// Configure CORS to allow frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Replace with your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGrpc();
builder.Services.AddSingleton<MessageBroker>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();
app.MapGrpcService<SongRPCService>();
app.Run();
