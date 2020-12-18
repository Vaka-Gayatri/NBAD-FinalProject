import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { disableDebugTools } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 dataSource =  [];
 token = localStorage.getItem('Token')
  constructor(private http: HttpClient) {
   }



  //  tslint:disable-next-line: typedef
   getData() {
    // console.log(localStorage.getItem());
    return this.http.get('http://localhost:3000/budget');
  }

  getBudgetById(userData: User) {
    console.log(userData);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://localhost:3000/budget_ById', userData,{
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${this.token}` },
    });
  }

  addBudget(budget: Budget, userData : User ){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://localhost:3000/add-budget', {budget, userData},{
      headers: { 'Content-Type': 'application/json','Authorization' : `Bearer ${this.token}` },
    });
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

  updateUserCategory(userCategory: any, userData: any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://localhost:3000/add-user-category', {userCategory, userData},{
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${this.token}`},
    });
  }

  getBarChartData(userData: any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://localhost:3000/get_barGraphData', {userData},{
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${this.token}`},
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

interface Budget {
  id: string;
  title: string;
  budget: Number;
  color: string;
}
