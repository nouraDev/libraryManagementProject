using System.ComponentModel.DataAnnotations;

namespace libraryManagementProject.Server.Model
{
    public class Register
    {
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }

        [StringLength(8, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 6)]
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
