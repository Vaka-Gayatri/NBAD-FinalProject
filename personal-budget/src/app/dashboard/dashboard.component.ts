import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { Chart } from 'chart.js';


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
  constructor(private router : Router,private http: HttpClient, public dataService: DataService) { }

  ngOnInit(): void {
    this.getBudgetById();
    this.data();
  }


 // tslint:disable-next-line: typedef
 createChart() {
    const ctx = document.getElementById('myChart');
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
  data() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.dataService.getBarChartData(userData).subscribe((data: any) => {
      let month = 11;
      let year = 1969;
      let cat = {}
      userData.budgetCategories.forEach(element => {
        cat[element.categoryName.toLowerCase()] = { 'limitPerMonth': element.limitPerMonth, 'BudgetUsed': 0}
      });
      data.forEach(element => {
        let elem_month = new Date(element.createdAt).getMonth();
        let elem_year = new Date(element.createdAt).getFullYear();
        if(elem_month == month && elem_year == year){
          try{
            cat[element.title.toLowerCase()]['BudgetUsed'] += element.budget;
          } catch {
            console.log(element.title)
          }
          console.log(element.budget);
        }
      });
      console.log(cat)
    });
  }


}
