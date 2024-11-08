using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using User.Service.Dtos;  // Adjust based on your actual namespace
using User.Service.Repositories; // Adjust based on your actual namespace
using User.Service.Entities;

namespace User.Service.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly UsersRepository _usersRepository;
        private readonly string _jwtSecret;

        public UserController(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
            _jwtSecret = "this_is_a_256_bit_secret_key_for_jwt_token"; // Ensure this is 32 characters (256 bits)
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            var users = await _usersRepository.GetAllUsersAsync();
            return Ok(users.Select(user => new UserDto(user.Id, user.FullName, user.Email, user.Password)));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(Guid id)
        {
            var user = await _usersRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserDto(user.Id, user.FullName, user.Email, user.Password));
        }


        [HttpPost]
        public async Task<ActionResult<UserDto>> Post(CreateUserDto createUserDto)
        {
            var user = new AppUser
            {
                Id = Guid.NewGuid(),
                FullName = createUserDto.FullName,
                Email = createUserDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password) // Hash the password
            };

            await _usersRepository.AddUserAsync(user);

            // Return the newly created user as a DTO
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, new LoggedDto(user.FullName, user.Email));
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, UpdateUserDto updateUserDto)
        {
            var user = await _usersRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.FullName = updateUserDto.FullName;
            user.Email = updateUserDto.Email;
            user.Password = BCrypt.Net.BCrypt.HashPassword(updateUserDto.Password); // Hash the password

            await _usersRepository.UpdateUserAsync(id, user);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var user = await _usersRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _usersRepository.DeleteUserAsync(id);
            return NoContent();
        }


        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = await _usersRepository.GetUserByEmailAsync(loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return Unauthorized(); // Unauthorized if user not found or password doesn't match
            }

            // var token = GenerateJwtToken(user);

            return Ok(new LoggedDto(user.FullName, user.Email)); // Include token in the response
        }


        private string GenerateJwtToken(AppUser user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Use the 256-bit secret key for signing the JWT
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "your_issuer",  // Replace with your issuer
                audience: "your_audience", // Replace with your audience
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
