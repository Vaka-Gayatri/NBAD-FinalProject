import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements AfterViewInit {

  private data = [];
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(private http: HttpClient, public dataService: DataService) { }


  ngAfterViewInit(): void {
    if (this.dataService.dataSource.length > 0){
      this.data = this.dataService.dataSource;
      this.createSvg();
      this.createColors();
      this.drawChart();
    } else {
    this.dataService.getData().subscribe((data: any) => {
      console.log(data);
      this.data = data;
      this.createSvg();
      this.createColors();
      this.drawChart();
    });
  }
  }

  private createSvg(): void {
    this.svg = d3.select('figure#pie')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr(
      'transform',
      'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.budget.toString()))
  .range(['#ffcd56', '#ff6384',  '#36a2eb', '#fd6b19', ' #b30000', '#aa80ff', '#800080']);
}

// tslint:disable-next-line: typedef
private angle(d) {
  const a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
  return a > 90 ? a - 180 : a;
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));
  console.log(pie);
  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr('stroke', '#121926')
  .style('stroke-width', '1px');
  console.log(this.radius);
  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text(d => d.data.title)
  .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
  .style('text-anchor', 'middle')
  .style('font-size', 15);
}


}
