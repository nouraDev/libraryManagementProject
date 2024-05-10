import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

const BASE_URL=""

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiUrl: any='http://localhost:7054/api';
  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(user:any): Observable<any> {
    let body = JSON.stringify(user)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:7054/api/Authentication/login', body, {headers})
        .pipe(map((response: any) => {
          localStorage.setItem('currentUser',JSON.stringify(response.user))
          return response;
    }));
  }

  register(user:any):Observable<any>{
    let body = JSON.stringify(user)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:7054/api/Authentication/register', body, {headers})
        .pipe(map((response: any) => {
          localStorage.setItem('currentUser',response)
          return response;
    }));

  }
  
  isAuthenticated(): Observable<boolean> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<boolean>(`${this.apiUrl}/Authentication/check-auth`, {headers}).pipe(map((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }));
  }
  saveResponseJson(response: any) {
  }
}
