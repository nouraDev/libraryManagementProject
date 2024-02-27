import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagementServiceService } from 'src/app/services/book-management-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {
  public bookId: any;
  public book: any;
  private subscriptions: Array<Subscription> = [];
  
  constructor(
    private bookmanagementService:BookManagementServiceService,
    private route: ActivatedRoute){
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['bookId']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.bookId);
    });

    this.getSingleBook();
  }

  public getSingleBook(){
    this.subscriptions.push(
      this.bookmanagementService.getSingleBook(this.bookId).subscribe(
        data=>{
          this.book=data;
        },
        error=>{
          console.log(error.message)
        }
      )
    )
  }

  public borrowTheBook(bookId:number){
    this.subscriptions.push(
      this.bookmanagementService.borrowBook(this.bookId).subscribe(
        data=>{
          alert("You've borrowed the book successfully")
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
