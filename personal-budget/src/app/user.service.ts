import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  userToken = localStorage.getItem('Token')

  getUser(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://localhost:3000/get-user', {'userToken' : this.userToken},{
      headers: { 'Content-Type': 'application/json' },
    });
  }

}
