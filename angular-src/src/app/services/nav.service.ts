import {  Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class NavService {

  url;
  
  constructor(private Router: Router) {
    this.url= this.Router.url;
   }

  
  getUrl(){
    return this.url;
  }


  checkUrl(){
    this.url= this.Router.url;
  }

}
