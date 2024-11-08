namespace User.Service.Dtos
{
    public record UserDto(Guid Id, string FullName, string Email, string Password);

    public record CreateUserDto(string FullName, string Email, string Password);

    public record UpdateUserDto(string FullName, string Email, string Password);

    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public record LoggedDto(string FullName, string Email);
}