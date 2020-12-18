import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { Chart } from 'chart.js';
import { UserService } from '../user.service';


@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                ' #b30000',
                '#aa80ff',
                '#800080',
                '#ac7339',
                '#4dffc3',
                '#ffff66'
            ],
        }
    ],
    labels: []
};

newData = [];
  constructor(private router : Router,private http: HttpClient, public dataService: DataService, public userService: UserService) { }

  ngOnInit(): void {
    this.getBudgetById();
  }


 // tslint:disable-next-line: typedef
 createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

  navigateToAddBudget(){
    this.router.navigate(['/add-budget']);
  }

  navigateToAddCategory(){
    this.router.navigate(['/add-category']);
  }

  getBudgetById(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    this.dataService.getBudgetById(userData).subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.dataSource.datasets[0].data[i] = data[i].budget;
        this.dataSource.labels[i] = data[i].title;
        this.createChart();
      }
    });
  }



}
