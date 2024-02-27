using System.ComponentModel.DataAnnotations;
using System.Dynamic;

namespace LibraryWebService.model
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public string? Image { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? Genre { get; set; }
        public string? Description { get; set; }

        public bool IsAvailable { get; set; }


/*        public int GetId()
        {
            return Id;
        }
        public string GetTitle()
        {
            return Title;
        }
        public string GetAuthor()
        {
            return Author;
        }
        public string GetGenre()
        {
            return Genre;
        }
        public bool GetIsAvailable()
        {
            return IsAvailable;
        }


        public void SetTitle(string title)
        {
            this.Title = title;
        }
        public void SetAuthor(string author)
        {
            this.Author = author;
        }
        public void SetGenre(string genre)
        {
            this.Genre = genre;
        }
        public void SetIsAvailable(bool isavailable)
        {
            this.IsAvailable = isavailable;
        }*/
    }
}
