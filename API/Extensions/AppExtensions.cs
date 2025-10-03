using System.Text;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class AppExtensions
{
    public static UserDto ToDto(this AppUser user, ITokenService tokenService)
    {
        return new UserDto(user.Id, user.Email, user.DisplayName, tokenService.CreateToken(user));
    }

    public static SecurityKey GetSecurityKey(this IConfiguration configuration)
    {
        var tokenKey = configuration["TokenKey"] ?? throw new Exception("Cannot get token key");

        if (tokenKey.Length < 64) throw new Exception("Your token key needs to be >=64 characters");

        //SSL uses Asymetric (private/public certicate)
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        return key;
    }
}

