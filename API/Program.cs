using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(opt => opt.WithOrigins("https://localhost:4200").AllowAnyHeader().AllowAnyMethod());

app.MapControllers();


app.Run();


// INSERT INTO Users (Id, DisplayName, Email) VALUES ('bob-id','Bob','bob@test.com');
// INSERT INTO Users (Id, DisplayName, Email) VALUES ('tom-id','Tom','tom@test.com');
// INSERT INTO Users (Id, DisplayName, Email) VALUES ('jane-id','Jane','jane@test.com');