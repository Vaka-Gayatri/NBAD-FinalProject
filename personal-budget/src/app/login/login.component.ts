import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private dataService : DataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.dataService.userAuth(this.loginForm.value).subscribe((data: any)  => {
      console.log(data);
      if(data.err == null){
        localStorage.setItem('Token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.userData));
        this.router.navigate(['/dashboard']);
      } else {
         alert(data.err)
      }

    });
  }
}
