import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'pb-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private router : Router, private dataService : DataService, private userService : UserService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.registerForm.value)
    this.dataService.createUser(this.registerForm.value).subscribe((data: any) => {
      if (Object.keys(data).length > 0 ){
        console.log("successfully registered");
        this.router.navigate(['/login']);
      }
    });
  }

}
