import { AuthService } from './../../services/auth.service';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  constructor(
    private ordersService : OrdersService,
    private authService: AuthService) { }

  orders;
  user;

  ngOnInit() {
    
    if (this.authService.loggedIn()){
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user);
      this.ordersService.getOrder(this.user.id)
        .subscribe(orders =>{
          this.orders = orders;
          console.log(this.orders);
        },err =>{
          console.log(err);
        });
    }
    
   
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
