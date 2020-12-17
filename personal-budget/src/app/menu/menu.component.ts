import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  logout(){
     localStorage.clear();
     this.router.navigate(['/login']);
  }
}
