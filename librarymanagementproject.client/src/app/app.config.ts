
import { ApplicationConfig, importProvidersFrom } from '@angular/core'; 
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

export const appConfig: ApplicationConfig = { providers: [provideRouter(routes),
    importProvidersFrom(
        CommonModule, 
        RouterModule, 
        BrowserModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        NgModel,
        DropdownModule,
        BrowserAnimationsModule,
        BrowserModule,
        ActivatedRoute
        
),
]};