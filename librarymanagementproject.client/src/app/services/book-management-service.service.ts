import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookManagementServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getBooks():Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get('http://localhost:7054/api/books', {headers})
    .pipe(map((response: any) => {
      return response;
    }));
  }

  getSingleBook(bookId:number):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`http://localhost:7054/api/books/${bookId}`,{headers})
    .pipe(map((response:any)=>{
      return response;
    }))
  }

  updateBook(bookDetail:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:7054/api/books',bookDetail,{headers})
    .pipe(map((response:any)=>{
      return response;
    }))
  }

  deleteBook(bookId:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(`http://localhost:7054/api/books/${bookId}`,{headers})
    .pipe(map((response:any)=>{
      return response;
    }))
  }

  searchBook(bookInfo:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let searchParameter = bookInfo.trim();
    let  params = new HttpParams().set('query', searchParameter) 

    const httpOptions = {
      headers: headers,
      params: params
    };

    return this.http.get(`http://localhost:7054/api/books/search`,{headers,params})
    .pipe(map((response:any)=>{
      return response; 
    })) 
  }

  filterBook(bookGenre:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let searchParameter = bookGenre.trim();
    let  params = new HttpParams().set('genre', searchParameter) 

    const httpOptions = {
      headers: headers,
      params: params
    };

    return this.http.get(`http://localhost:7054/api/books/filter`,{headers,params})
    .pipe(map((response:any)=>{
      return response; 
    })) 
  }


  borrowBook(bookId:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`http://localhost:7054/api/books/borrow/${bookId}`,{headers})
    .pipe(map((response:any)=>{
      return response; 
    })) 
    
  }

  returnBook(bookId:number):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`http://localhost:7054/api/books/return/${bookId}`,{headers})
    .pipe(map((response:any)=>{
      return response; 
    }))
  }
  
}
