import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from '../books-list/books-list.component';
import { BookManagementServiceService } from 'src/app/services/book-management-service.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [CommonModule, BooksListComponent,RouterOutlet,FormsModule,DropdownModule],
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss']
})
export class LibraryPageComponent implements OnInit{
  public books: any=[];
  public booksGenres:any=[];
  public searchValue:string='';
  public selectedGenre:any ='';

  private subscriptions: Array<Subscription> = [];
  constructor(
    private http:HttpClient,
    private bookManagementService:BookManagementServiceService
  ){}
  ngOnInit(): void {
    this.getBooks();
    this.booksGenres= [
      { genre: 'literary fiction'},
      { genre: 'mystery'},
      { genre: 'thriller' },
      { genre: 'horror'},
      { genre: 'historical'},
      { genre: 'romance' },
      { genre: 'western'},
      { genre: 'financial'}
  ];
  }

  public getBooks(){
    this.subscriptions.push(
      this.bookManagementService.getBooks().subscribe(          
        data => {
         this.books=data;   
      },
      error => {
        console.log(error.message)
      })
    )

  }

  public searchBook(){
    this.subscriptions.push(
      this.bookManagementService.searchBook(this.searchValue).subscribe(
        data=>{
          this.books=data;
          console.log(this.books)
        },
        error=>{
          console.log(error.message)
        }
      )
    )
  }

  public filterBooks(){
    this.subscriptions.push(
      this.bookManagementService.filterBook(this.selectedGenre.genre).subscribe(
        data=>{
          this.books=data;
          console.log(this.books)
        },
        error=>{
          console.log(error.message)
        }
      )
    )

  }


  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
    });
  }
}
