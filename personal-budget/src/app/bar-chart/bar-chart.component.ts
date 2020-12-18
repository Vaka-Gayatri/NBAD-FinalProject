import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent  implements OnInit{
  title = 'Please select month and year to show expenses per month-year';
  chartOptions = {
    responsive: true
  }

  months = ['JAN','FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  // labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  labels =  [];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: 'budget',
      // data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59]
      data:[]
    },
    {
      label: 'limit',
      data: []
    }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]


  addDateForm = new FormGroup({
    month: new FormControl(''),
    year: new FormControl(''),
  });
  pickMonth: any;
  year: any;


  constructor(private dataService : DataService) {}
  ngOnInit(){
    this.data();
  }

  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

  onSubmit(){
   this.pickMonth = this.months.indexOf(this.addDateForm.value.month);
   this.year = this.addDateForm.value.year;
   console.log(this.pickMonth)
   console.log(this.year);
   this.data();
  }

  data() {
    this.labels= [];
    this.chartData[0].data= [];
    this.chartData[1].data= [];
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.dataService.getBarChartData(userData).subscribe((data: any) => {

      let month = this.pickMonth;
      let year = this.year;
      let cat = []
      userData.budgetCategories.forEach(element => {
        this.chartData[1].data.push(element.limitPerMonth);
        cat[element.categoryName.toLowerCase()]= { 'limitPerMonth': element.limitPerMonth, 'BudgetUsed': 0}
      });
      data.forEach(element => {
        let elem_month = new Date(element.createdAt).getMonth();
        let elem_year = new Date(element.createdAt).getFullYear();
        console.log(elem_month, elem_year)
        console.log(month, year)
        if(elem_month == month && elem_year == year){
          try{
            cat[element.title.toLowerCase()]['BudgetUsed'] += element.budget;
          } catch {
            console.log(element.title)
            this.labels.push(element.title);
          }
          console.log(element.budget);
          this.chartData[0].data.push(element.budget);
        }
      });
      // ADD CHART OPTIONS.
    let maxNumber = Math.max(Math.max(...this.chartData[0].data),Math.max(...this.chartData[1].data));
    this.chartOptions['scales'] = {
        yAxes: [{
            ticks: {
                min:0,
                max: maxNumber
            }
        }]
      },
      this.chartOptions['legend'] = {
        display: true,
        legendText : ['Current','Vs last week/month/year','% Change']
        }
    });
  }
}
