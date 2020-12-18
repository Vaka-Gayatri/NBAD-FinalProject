import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm = new FormGroup({
    categoryName: new FormControl(''),
    limitPerMonth: new FormControl(''),
  });

  constructor(private dataService : DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.categoryForm.value)
    let userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    this.dataService.updateUserCategory(this.categoryForm.value, userData).subscribe((data: any) => {
      if (Object.keys(data).length > 0 ){
        console.log("successfully added budget data");
        localStorage.setItem("userData", JSON.stringify(data));
        this.router.navigate(['/dashboard']);

      }
    });
  }


}
