import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { config } from './../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrdersService {

  ordersUrl;
  constructor(
    private HttpClient: HttpClient,
    private AuthService: AuthService,
    private router: Router) {
      this.ordersUrl = `${config.serverUrl}orders`;
   }

   saveOrder(items){
       let user = JSON.parse( localStorage.getItem('user'));
       let data = {
         userId : user.id,
         items : items
       }
       console.log(data);
      return this.HttpClient.post(this.ordersUrl,data);
     
   }

   getOrders(){
     return this.HttpClient.get(this.ordersUrl);
   }


   deleteOrder(orderId){
        return this.HttpClient.delete(`${this.ordersUrl}/${orderId}`);  
   }

   getOrder(userId){
     return this.HttpClient.get(`${this.ordersUrl}/${userId}`);
   }

}
