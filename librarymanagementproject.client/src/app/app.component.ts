import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './sheared-components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

// w kadiriha f app component ? aaah
//att nwrik
@Component({
  standalone:true,
  selector: 'app-root',
  imports:[CommonModule,RouterModule,HeaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    
  }



  title = 'librarymanagementproject.client';
}
