using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middlewares;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services
.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = builder.Configuration.GetSecurityKey(),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

//app.UseDeveloperExceptionPage(); // By default, it is enabled
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(opt => opt.WithOrigins("https://localhost:4200").AllowAnyHeader().AllowAnyMethod());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


// INSERT INTO Users (Id, DisplayName, Email) VALUES ('bob-id','Bob','bob@test.com');
// INSERT INTO Users (Id, DisplayName, Email) VALUES ('tom-id','Tom','tom@test.com');
// INSERT INTO Users (Id, DisplayName, Email) VALUES ('jane-id','Jane','jane@test.com');