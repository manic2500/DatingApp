using System;

namespace API.Errors;

public record ApiException(int StatusCode, string Message, string? Details);

public class NotFoundException(string message) : Exception(message)
{
}

public class BadRequestException(string message) : Exception(message)
{
}

public class UnauthorizedException(string message) : Exception(message)
{
}

/* 
public class ApiException2(int statusCode, string message, string? details)
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
} */
