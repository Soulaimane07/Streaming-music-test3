using Playlist_Service.Data;
using Playlist_Service.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<PlaylistDbContext>(serviceProvider =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    return new PlaylistDbContext(connectionString);
});


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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();
