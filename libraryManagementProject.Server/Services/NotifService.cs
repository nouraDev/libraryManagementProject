using libraryManagementProject.Server.DAOContext;
using Microsoft.EntityFrameworkCore;

namespace libraryManagementProject.Server.Services
{
    // Background service to handle notifications
    public class NotifService : BackgroundService
    {
        private readonly LibraryDBContext _context;
        private readonly IEmailService _emailService;

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            throw new NotImplementedException();
        }

        /*        public NotifService(LibraryDBContext context, IEmailService emailService)
                {
                    _context = context;
                    _emailService = emailService;
                }

                protected override async Task ExecuteAsync(CancellationToken stoppingToken)
                {
                    while (!stoppingToken.IsCancellationRequested)
                    {
                        // Check for overdue books and send notifications
                        await CheckOverdueBooks();

                        // Check for upcoming returns and send notifications
                        await CheckUpcomingReturns();

                        // Sleep for a certain interval before checking again
                        await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
                    }
                }

                private async Task CheckOverdueBooks()
                {
                    var overdueBooks = _context.BorrowedBooks
                        .Where(bb => !bb.IsReturned && bb.DueDate < DateTime.Now)
                        .Include(bb => bb.User)
                        .Include(bb => bb.Book)
                        .ToList();

                    foreach (var overdueBook in overdueBooks)
                    {
                        // Send notification (e.g., email) to the user about the overdue book
                        var subject = "Overdue Book Notification";
                        var message = $"The book '{overdueBook.Book.Title}' is overdue. Please return it as soon as possible.";

                        await _emailService.SendEmailAsync(overdueBook.User.Email, subject, message);

                    }
                }

                private async Task CheckUpcomingReturns()
                {
                    var upcomingReturns = _context.BorrowedBooks
                        .Where(bb => !bb.IsReturned && bb.DueDate > DateTime.Now && bb.DueDate < DateTime.Now.AddDays(3))
                        .Include(bb => bb.User)
                        .Include(bb => bb.Book)
                        .ToList();

                    foreach (var upcomingReturn in upcomingReturns)
                    {
                        var subject = "Upcoming Book Return Reminder";
                        var message = $"The book '{upcomingReturn.Book.Title}' is due for return in 3 days. Please plan to return it on time.";

                        await _emailService.SendEmailAsync(upcomingReturn.User.Email, subject, message);

                    }
                }*/
    }

}
