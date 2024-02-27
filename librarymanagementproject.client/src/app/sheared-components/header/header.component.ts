import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from 'src/app/_pipes/capitalize.pipe';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookManagementServiceService } from 'src/app/services/book-management-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {


  constructor(
    private authService:AuthServiceService,
    private bookService:BookManagementServiceService
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  public getUser(){

  }

  public logOut(){

  }
}
