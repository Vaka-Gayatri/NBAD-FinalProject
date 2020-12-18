import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { local } from 'd3';

@Component({
  selector: 'pb-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

  addBudgetForm = new FormGroup({
    title: new FormControl(''),
    budget: new FormControl(''),
    color: new FormControl('')
  });

  userData = JSON.parse(localStorage.getItem('userData'));


  constructor(private dataService : DataService, private router : Router) { }

  ngOnInit(): void {
    console.log(this.userData.budgetCategories);
  }

  onSubmit() {
    console.log(this.addBudgetForm.value)
    console.log(this.userData);
    this.dataService.addBudget(this.addBudgetForm.value, this.userData).subscribe((data: any) => {
      if (Object.keys(data).length > 0 ){
        console.log("successfully added budget data");
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
