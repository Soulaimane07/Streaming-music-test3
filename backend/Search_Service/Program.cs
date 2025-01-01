using Nest;
using Search_Service.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register ElasticsearchClient
builder.Services.AddSingleton<ElasticsearchClient>();
builder.Services.AddSingleton<IElasticClient>(sp =>
{
    var elasticsearchClient = sp.GetRequiredService<ElasticsearchClient>();
    return elasticsearchClient.GetClient();
});
builder.Services.AddSingleton<MessageBroker>();

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


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowFrontend");

// Start consuming messages from RabbitMQ
var broker = app.Services.GetRequiredService<MessageBroker>();
Task.Run(() => broker.ConsumeMessages("catalog_exchangee", "song.added", "songs_queue"));


app.Run();
