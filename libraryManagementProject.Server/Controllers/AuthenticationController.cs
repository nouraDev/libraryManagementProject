using libraryManagementProject.Server.DAOContext;
using libraryManagementProject.Server.Model;
using libraryManagementProject.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace libraryManagementProject.Server.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AuthenticationController: ControllerBase
    {
        private readonly LibraryDBContext _dbcontext;
        private readonly AuthService _authService;
        public AuthenticationController(LibraryDBContext context, AuthService authService)
        {
            _dbcontext = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public ActionResult Register(Register userRegister)
        {
            // Validate user input
            if (userRegister == null)
            {
                return BadRequest("Invalid user data");
            }

            if (string.IsNullOrEmpty(userRegister.Username) || string.IsNullOrEmpty(userRegister.Password) || string.IsNullOrEmpty(userRegister.Email))
            {

                return BadRequest("Username, email, and password are required");
            }

            // Check if the username is unique
            if (_dbcontext.Users.Any(u => u.Username == userRegister.Username))
            {
                return BadRequest("Username is already taken");
            }

            // Check if the email is unique
            if (_dbcontext.Users.Any(u => u.Email == userRegister.Email))
            {
                return BadRequest("Email is already registered");
            }

            // Validate email format 
            if (!IsValidEmail(userRegister.Email))
            {
                return BadRequest("Invalid email format");
            }

            // Hash the password 
            userRegister.Password = HashPassword(userRegister.Password);

            // Set default role for new users
           // user.Role = "Member";
           User user= new User
           {
               Name = userRegister.Name,
               Username = userRegister.Username,
               Email = userRegister.Email,
               Password = userRegister.Password,
               Role = userRegister.Role
           };

            _dbcontext.Users.Add(user);
            _dbcontext.SaveChanges();

            return Ok(userRegister);
        }

        // Helper method for email validation
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        [HttpPost("login")]
        public IActionResult Login(Login login)
        {
            var user = _dbcontext.Users.FirstOrDefault(u => u.Email == login.Email);

            if (user == null || !VerifyPassword(login.Password, user.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            var token = _authService.GenerateJwtToken(user);

            return Ok(new { Token = token, user=user });
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Helper method to verify password using BCrypt
        private bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(inputPassword, hashedPassword);
        }

        [HttpGet("check-auth")]
        [Authorize(Roles = "Member")]
        public IActionResult CheckAuthentication()
        {
            // If the user is authorized, return Ok

            return Ok(new { response = true });
        }

    }
}
