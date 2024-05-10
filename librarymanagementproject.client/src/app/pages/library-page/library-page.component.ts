import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from '../books-list/books-list.component';
import { BookManagementServiceService } from 'src/app/services/book-management-service.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';


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
  public loadingData: boolean=false;
  public boolvalue: any;
  public showDropdown: boolean = false;
  public changeAllButtonBackground:boolean=true;
  constructor(
    private http:HttpClient,
    private bookManagementService:BookManagementServiceService,
    private authservice:AuthServiceService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2, 
  ){}
  ngOnInit(): void {
    this.getBooks();
    this.booksGenres= [
      { genre: 'Literary fiction'},
      { genre: 'Mystery'},
      { genre: 'Thriller' },
      { genre: 'Horror'},
      { genre: 'Historical'},
      { genre: 'Romance' },
      { genre: 'Western'},
      { genre: 'Financial'},
      { genre: 'Religious'}
  ];
  }

  public getBooks(){
    this.selectedGenre=null;
    this.changeAllButtonBackground=true;
    this.loadingData=false;
    this.subscriptions.push(
      this.bookManagementService.getBooks().subscribe(          
        data => {
          this.loadingData=true;
         this.books=data;   
         console.log('books :', this.books)
      },
      error => {
        console.log(error.message)
      })
    )

  }
  public getButtonStyle(genre: string | null): any {
    if(genre){
      return {
        'background-color': this.selectedGenre === genre ? '#D14031' : '',
        'color': this.selectedGenre === genre ? 'white' : '',
        'border': 'none',
        'height': '40px',
        'width': '110px',
        'border-radius': '4px',
      };
    }
    else{
      return {
        'background-color':  '#D14031' ,
        'color': 'white' ,
        'border': 'none',
        'height': '40px',
        'width': '110px',
        'border-radius': '4px',
      };

    }

  }


  public toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
  scrollToSection(sectionId: string): void {
    const targetElement = this.el.nativeElement.querySelector(`#${sectionId}`);

    if (targetElement) {
      this.smoothScroll(targetElement);
    }
  }

  private smoothScroll(targetElement: HTMLElement): void {
    const offset = targetElement.offsetTop;
    const duration = 40;

    this.renderer.setProperty(document.documentElement, 'scrollTop', offset);
    this.animateScroll(duration);
  }

  private animateScroll(duration: number): void {
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const start = window.pageYOffset;

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const offset = this.easeInOut(elapsedTime, start, duration);

      this.renderer.setProperty(document.documentElement, 'scrollTop', offset);

      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  private easeInOut(t: number, b: number, d: number): number {
    t /= d / 2;
    if (t < 1) {
      return (document.documentElement.scrollHeight / 2) * t * t + b;
    }
    t--;
    return (-(document.documentElement.scrollHeight / 2)) * (t * (t - 2) - 1) + b;
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

  public filterBooks(selectedGenre:string){
    this.changeAllButtonBackground=false;
    this.selectedGenre=selectedGenre;
    
    this.subscriptions.push(
      this.bookManagementService.filterBook(selectedGenre).subscribe(
        data=>{
          this.books=data;
          console.log(this.books)
          this.showDropdown=false;
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
