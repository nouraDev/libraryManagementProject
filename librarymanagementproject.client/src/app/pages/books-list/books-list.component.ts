import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CapitalizePipe } from 'src/app/_pipes/capitalize.pipe';
import { BookManagementServiceService } from 'src/app/services/book-management-service.service';
import { Subscription } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet, CapitalizePipe],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnChanges {
  @Input() books?:any=[];
  public isAdmin :boolean=false; 
  public bookId?: number;
  subscriptions: any;

  constructor(
    private router:Router,
    private bookmanagementService:BookManagementServiceService
  ){

  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
  }

  public goToAdd(){
    this.router.navigate(['/library/books/new-book'])

  }

  public openBook(bookid:any){
    this.router.navigate([`/library/books/book-description/${bookid}`])
  }

  public deleteBook(){
    this.subscriptions.push(    
      this.bookmanagementService.deleteBook(this.bookId).subscribe(
      data => {
        alert("the book is deleted")
      },
      error => {
        console.log(error.message)
      })
    )


  }

  public confirmDeletePopup(bookId:number){
    this.bookId=bookId;
    $('#confirmDelete').modal('show');

  }

  public updateBook(bookId:number){
    this.subscriptions.push(    
      this.bookmanagementService.updateBook(bookId).subscribe(
      data => {
        this.books=data;
      },
      error => {
        console.log(error.message)
    })
    )
    
  }

  public borrowBook(bookId:number){
    this.subscriptions.push(    
      this.bookmanagementService.borrowBook(bookId).subscribe(
      data => {
        alert("you've borrowed the book, check your profile")
      },
      error => {
        console.log(error.message)
    })
    )

  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
    });
  }

}
