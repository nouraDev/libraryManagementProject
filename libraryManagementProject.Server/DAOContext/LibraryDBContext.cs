using libraryManagementProject.Server.Model;
using LibraryWebService.model;
using Microsoft.EntityFrameworkCore;

namespace libraryManagementProject.Server.DAOContext
{
    public class LibraryDBContext : DbContext
    {
        public LibraryDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<BorrowedBook> BorrowedBooks { get; set; }

/*        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<BorrowedBook>()
                .HasKey(bb => new { bb.UserId, bb.BookId });

            modelBuilder.Entity<BorrowedBook>()
                .HasOne(bb => bb.User)
                .WithMany(u => u.BorrowedBooks)
                .HasForeignKey(bb => bb.UserId);

            modelBuilder.Entity<BorrowedBook>()
                .HasOne(bb => bb.Book)
                .WithMany(b => b.BorrowedBooks)
                .HasForeignKey(bb => bb.BookId);
        
        }*/

    }
}
