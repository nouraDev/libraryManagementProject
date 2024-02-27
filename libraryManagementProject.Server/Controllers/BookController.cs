using libraryManagementProject.Server.DAOContext;
using libraryManagementProject.Server.Model;
using LibraryWebService.model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace libraryManagementProject.Server.Controllers
{
    
    [Route("api/books")]
    [ApiController]
    public class BookController:ControllerBase
    {
        private readonly LibraryDBContext _dbContext;
        public BookController( LibraryDBContext libraryDBContext)
        {
            _dbContext = libraryDBContext;
            
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            if (_dbContext == null)
            {
                return NotFound();
            }
            else
            {
                return await _dbContext.Books.ToListAsync();
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            if (_dbContext == null)
            {
                return NotFound();
            }
            else
            {
                var book = await _dbContext.Books.FindAsync(id);
                if (book == null)
                {
                    return NotFound(id);
                }
                return book;
                
            }

        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            
            _dbContext.Books.Add(book);
            await _dbContext.SaveChangesAsync();
            //return Ok(book);
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
            //return CreatedAtAction(nameof(AddBook), book);
        }
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Book>> ModifyBook(int id,Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(book).State = EntityState.Modified;
            try {
                await _dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                if ( !isBookAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                     throw;
                }
            }
            return Ok();
        }
        private bool isBookAvailable(int id)
        {
            return (_dbContext.Books?.Any(x => x.Id == id)).GetValueOrDefault();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            if (_dbContext.Books == null)
            {
                return NotFound();
            }
            var book =await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.Books.Remove(book);
            await _dbContext.SaveChangesAsync();
            return Ok(book);
        }

        
        [HttpGet("search")]
        public  IEnumerable<Book> SearchBooks([FromQuery] string query)
        {
            Console.WriteLine(query);
            var result = _dbContext.Books
                .Where(book => book.Title.Contains(query) || book.Author.Contains(query) || book.Genre.Contains(query))
                .ToList();

            return result;
        }

        [HttpGet("filter")]
        public IEnumerable<Book> FilterBooks([FromQuery] string genre)
        {
            var result = _dbContext.Books
                .Where(book => book.Genre.Equals(genre))
                .ToList();

            return result;
        }

        [HttpPost("borrow/{id}")]
        [Authorize(Roles = "Member")]
        public IActionResult BorrowBook(int id)
        {
            var book = _dbContext.Books.Find(id);

            if (book == null || !book.IsAvailable)
            {
                return BadRequest("Book not available for borrowing");
            }

            var userId = GetUserIdFromToken(); 

            var borrowedBook = new BorrowedBook
            {
                UserId = userId,
                BookId = id,
                BorrowDate = DateTime.Now,
                DueDate = DateTime.Now.AddDays(30), 
                IsReturned = false
            };

            _dbContext.BorrowedBooks.Add(borrowedBook);
            book.IsAvailable = false;
            _dbContext.SaveChanges();

            return Ok("Book successfully borrowed");
        }

        
        [HttpPut("return/{id}")]
        [Authorize(Roles = "Member")]
        public IActionResult ReturnBook(int id)
        {
            var borrowedBook = _dbContext.BorrowedBooks
                .FirstOrDefault(bb => bb.BookId == id && !bb.IsReturned);

            if (borrowedBook == null)
            {
                return BadRequest("Book not found in borrowed books list");
            }

            borrowedBook.IsReturned = true;

            var book = _dbContext.Books.Find(id);
            if (book != null)
            {
                book.IsAvailable = true;
            }

            _dbContext.SaveChanges();

            return Ok("Book successfully returned");
        }

        private int GetUserIdFromToken()
        {
            var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
            throw new InvalidOperationException("User ID not found in the token.");
        }




    }
}
