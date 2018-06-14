import { Router } from '@angular/router';
import { OrdersService } from './../../services/orders.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{config} from '../../config/config';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  myCart;
  total:number;
  order;
  serverUrl;
  constructor(
    private cartService : CartService,
    private ordersService: OrdersService,
    private router : Router,
    private authService:AuthService) { }

  ngOnInit() {
    this.serverUrl = config.serverUrl;
    this.myCart = this.cartService.getMyCart();
    if(this.myCart == null){
      this.myCart = [];
    }
    this.total = 0;
    this.myCart.forEach(item => {
      this.total += item.price *item.cartQuantity;
    });

    console.log(this.myCart);
  }


  buy(){

    if(!this.authService.loggedIn()){
      this.router.navigate(['login']);
      return;
    }
    this.ordersService.saveOrder(this.myCart)
      .subscribe(order =>{
        this.router.navigate(['orders']);
        this.clearCart();
        
      }, err =>{
        console.log(err);
      });
  }


  deleteItem(id){
    this.cartService.deleteItem(id);
    this.ngOnInit();

  }

  clearCart(){
    localStorage.removeItem('myCart');
    this.ngOnInit();
  }



}// end component.
