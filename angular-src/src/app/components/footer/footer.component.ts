import { Router } from '@angular/router';
import { NavService } from './../../services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private navService: NavService ) { }
 
  ngOnInit() {  
  }
 
  getClass(){
    if(this.checkAdmin()){
      return 'dark-footer';
    }else{
      return 'light-footer';
    }
  }

  getBoxClass(){
    if(this.checkAdmin()){
      return 'footer-box-dark';
    }else{
      return 'footer-box';
    }
  }
 
  checkAdmin(){
    let str = this.navService.getUrl();
    if (str.substr(1,5) =='admin'){
      return true;
    }  
    return false;
  }

}
