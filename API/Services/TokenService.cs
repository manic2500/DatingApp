using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser appUser)
    {
        // Payload
        List<Claim> claims = [
            new Claim(ClaimTypes.Email, appUser.Email),
            new Claim(ClaimTypes.NameIdentifier, appUser.Id),
        ];

        SecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new(config.GetSecurityKey(), SecurityAlgorithms.HmacSha512Signature)
        };
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

}

/* var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot get token key");
        if (tokenKey.Length < 64) throw new Exception("Your token key needs to be >=64 characters");
        //SSL uses Asymetric (private/public certicate)4
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        // Sign the token 
        //SigningCredentials creds = new(GetSecurityKey(), SecurityAlgorithms.HmacSha512Signature); */