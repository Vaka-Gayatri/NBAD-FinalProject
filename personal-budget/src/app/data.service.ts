import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get('http://localhost:3000/budget');
  }
}
