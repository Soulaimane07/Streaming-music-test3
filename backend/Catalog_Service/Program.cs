using Catalog_Service.Data;
using Catalog_Service.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<CatalogDbContext>(serviceProvider =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    return new CatalogDbContext(connectionString);
});

builder.Services.AddControllers();
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
