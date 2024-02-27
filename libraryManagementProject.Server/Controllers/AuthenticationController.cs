using libraryManagementProject.Server.DAOContext;
using libraryManagementProject.Server.Model;
using libraryManagementProject.Server.Services;
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
        public ActionResult Register(User user)
        {
            // Validate user input
            if (user == null)
            {
                return BadRequest("Invalid user data");
            }

            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.Email))
            {

                return BadRequest("Username, email, and password are required");
            }

            // Check if the username is unique
            if (_dbcontext.Users.Any(u => u.Username == user.Username))
            {
                return BadRequest("Username is already taken");
            }

            // Check if the email is unique
            if (_dbcontext.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest("Email is already registered");
            }

            // Validate email format 
            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Invalid email format");
            }

            // Hash the password 
            user.Password = HashPassword(user.Password);

            // Set default role for new users
            user.Role = "Member";

            _dbcontext.Users.Add(user);
            _dbcontext.SaveChanges();

            return Ok( user);
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
        
    }
}
