import { AuthService } from './../../services/auth.service';
import { forEach } from '@angular/router/src/utils/collection';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor(
    private ordersService : OrdersService,
    private authService: AuthService) { }

  orders;

  ngOnInit() {
    this.ordersService.getOrders().subscribe(orders =>{
      this.orders = orders;
    },err =>{
      console.log(err);
    });
   
  }

  calculate(items){
    var sum = 0;
    items.forEach(element => {
      if(element.book){
        sum += element.book.price* element.quantity;
      }
    });
    return sum;
  }

  deleteOrder(orderId){
    if(this.authService.loggedIn()){
      this.ordersService.deleteOrder(orderId)
        .subscribe(res =>{
          console.log(res);
          this.ngOnInit();
        },err =>{
          console.log(err);
        });
    }   
  }



}
