import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

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
  constructor(private http: HttpClient, public dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.dataService.getData());
    if (this.dataService.dataSource.length > 0){
      for (let i = 0; i < this.dataService.dataSource.length; i++) {
        this.dataSource.datasets[0].data[i] = this.dataService.dataSource[i].budget;
        this.dataSource.labels[i] = this.dataService.dataSource[i].title;
        this.createChart();
      }
    } else {
    this.dataService.getData().subscribe((data: any) => {
      console.log(data.length);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.dataSource.datasets[0].data[i] = data[i].budget;
        this.dataSource.labels[i] = data[i].title;
        this.createChart();
      }
    });
  }
  }

 // tslint:disable-next-line: typedef
 createChart() {
    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}
}
