import { NavService } from './../../services/nav.service';
import {  Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit {

  constructor(
    private navService: NavService,
    private Router: Router) { }

  mainNav ;

  ngOnInit() {
    console.log(this.Router.url)
  }
  
  getUrl(){
    return  this.navService.getUrl();
  }

  checkAdmin(){
    let str = this.navService.getUrl();
    if (str.substr(1,5) =='admin'){
      return true;
    }  
    return false;
  }

}
