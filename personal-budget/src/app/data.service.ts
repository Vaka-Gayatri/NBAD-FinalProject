import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { disableDebugTools } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 dataSource =  [];

  constructor(private http: HttpClient) {
   }



  //  tslint:disable-next-line: typedef
   getData() {
    // console.log(localStorage.getItem());
    return this.http.get('http://localhost:3000/budget');
  }

  createUser(user: User) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://localhost:3000/register',  user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  userAuth(userData) {
    console.log('*************' + userData);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://localhost:3000/api/login/', userData , {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

interface User {
  UserID: string;
  Password: string;
  Email: string;
  FirstName: string;
  LastName: string;
}
