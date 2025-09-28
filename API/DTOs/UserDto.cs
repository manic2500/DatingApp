namespace API.DTOs;

public record UserDto
(
    string Id,
    string Email,
    string DisplayName,
    string Token,
    string? ImageUrl = null
);
/* public class UserDto
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public required string DisplayName { get; set; }
    public string? ImageUrl { get; set; }

}
 */