using System.Net;
using System.Text.Json;
using API.Errors;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.Extensions.Options;

namespace API.Middlewares;

// IMiddleware need to register as service in Program class.
// As long as the method name spelled correctly as "InvokeAsync" then that is enough instead of IMiddleware
public class ExceptionMiddleware(
    RequestDelegate next,
    ILogger<ExceptionMiddleware> logger,
    IHostEnvironment env,
    IOptions<JsonOptions> options
)
{

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "{message}", ex.Message);
            context.Response.ContentType = "application/json";

            //context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.StatusCode = ex switch
            {
                NotFoundException => (int)HttpStatusCode.NotFound,
                BadRequestException => (int)HttpStatusCode.BadRequest,
                UnauthorizedException => (int)HttpStatusCode.Unauthorized,
                _ => (int)HttpStatusCode.InternalServerError
            };

            var response = env.IsDevelopment()
            ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new ApiException(context.Response.StatusCode, ex.Message, "Internal server error");

            /*             var options = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                        }; */
            var json = JsonSerializer.Serialize(response, options.Value.SerializerOptions);

            await context.Response.WriteAsync(json);

        }

    }
}
