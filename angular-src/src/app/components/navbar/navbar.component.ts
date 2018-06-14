import { AuthService } from './../../services/auth.service';
import { User } from '../../models/user.model'

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  
  constructor(
    private authService : AuthService ,
    private router: Router) { }


  ngOnInit() {
      this.user = this.authService.getUser();
  }

  loggedIn(){
    let flag ;
    flag = this.authService.loggedIn();
    if(flag){
      this.user = this.authService.getUser();
    }
    return flag;
  }

  logout() {
    this.authService.logout();
  }

}
