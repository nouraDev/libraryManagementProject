﻿using LibraryWebService.model;

namespace libraryManagementProject.Server.Model
{
    public class BorrowedBook
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }

        public int BookId { get; set; }
        public Book? Book { get; set; }

        public DateTime BorrowDate { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsReturned { get; set; }
    }
}
