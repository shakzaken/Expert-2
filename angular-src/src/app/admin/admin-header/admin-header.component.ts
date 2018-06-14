import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {CategoriesService} from '../../services/categories.service';
import {UserService} from '../../services/user.service';
import {OrdersService} from '../../services/orders.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private orderService:OrdersService,
    private bookService:BooksService,
    private usersService: UserService,
    private categoriesService:CategoriesService) { }

  users: Number;
  orders: Number;
  books: Number;
  categories: Number;

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((books: any[]) => this.books = books.length,
       err => console.log(err));

    this.usersService.getUsers()
      .subscribe((users:any[]) => this.users = users.length,
      err => console.log(err));
    
    this.categoriesService.getCategories()
      .subscribe((categories : any[]) => this.categories = categories.length , err => console.log(err) );

    this.orderService.getOrders()
      .subscribe((orders:any[]) => this.orders = orders.length,
      err => console.log(err));


  }

}
