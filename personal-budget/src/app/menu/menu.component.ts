import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  logStatus: boolean;

  constructor(private router : Router) { }

  ngOnInit(): void {

   this.logStatus = true?localStorage.getItem('logStatus') == "true":false;

  }


  logout(){
     localStorage.clear();
     localStorage.setItem('logStatus', 'false');
    //  this.router.navigate(['/login']);
     window.location.href = '/login'
  }
}
