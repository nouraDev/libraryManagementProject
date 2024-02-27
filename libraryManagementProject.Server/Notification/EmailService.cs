using System.Net.Mail;

namespace libraryManagementProject.Server.Notification
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            using (var client = new SmtpClient())
            {
                // Configure SMTP client settings (SMTP server, port, credentials, etc.)

                var message = new MailMessage
                {
                    From = new MailAddress("your-email@example.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                message.To.Add(to);

                await client.SendMailAsync(message);
            }
        }
    }
}
