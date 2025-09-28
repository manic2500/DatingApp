using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser appUser)
    {
        var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot get token key");

        if (tokenKey.Length < 64) throw new Exception("Your token key needs to be >=64 characters");

        //SSL uses Asymetric (private/public certicate)4
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        // Payload
        List<Claim> claims = [
            new Claim(ClaimTypes.Email, appUser.Email),
            new Claim(ClaimTypes.NameIdentifier, appUser.Id),
        ];

        // Sign the token 
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
