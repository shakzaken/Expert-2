


import { NavService } from './../../services/nav.service';
import { CartService } from './../../services/cart.service';
import { CategoriesService } from './../../services/categories.service';
import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/book';
import{config} from '../../config/config';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {

  
  categories : any[];
  categoriesForView : any[];
  books : Book[];
  UIbooks : Book[];
  serverUrl;

  constructor(
    private booksService : BooksService,
    private categoriesService : CategoriesService ,
    private cartService : CartService,
    private navService: NavService) { }

  ngOnInit() {
    this.serverUrl = config.serverUrl;
    this.navService.checkUrl();
    this.booksService.getBooks()
      .subscribe((books:any[]) => {
        this.insertBooksForView(books); 
        this.insertUIBooks();
     
      });
     this.categoriesService.getCategories()
        .subscribe((categories:any[]) =>{
            this.categories = categories;
            var limit = 5;
            this.categoriesForView = [];
            for(var i = 0 ; i < limit && i<categories.length ; i++)  {
              this.categoriesForView[i] = this.categories[i];
            }
        });   
       
  }

  filterCategory(categoryId) {
     this.UIbooks = this.books.filter((book)=>{
      return book.category._id == categoryId;
    });
    console.log(this.UIbooks);
  }

  unFilter() {
    this.UIbooks = this.books;
  }

    addToCart(book : Book) {
      let quantity = this.cartService.addToCart(book);
      this.books.forEach((bookInArr) =>{
        if(book.id == bookInArr.id){
          bookInArr.cartQuantity = quantity;
        }
      });
      this.UIbooks.forEach((bookInArr) =>{
        if(book.id == bookInArr.id){
          bookInArr.cartQuantity = quantity;
        }
      });
     
    }
    decToCart(book : Book) {
      let quantity = this.cartService.decToCart(book);
      this.books.forEach((bookInArr) =>{
        if(book.id == bookInArr.id){
          bookInArr.cartQuantity = quantity;
        }
      });
      this.UIbooks.forEach((bookInArr) =>{
        if(book.id == bookInArr.id){
          bookInArr.cartQuantity = quantity;
        }
      });
     
    }
  
    private insertUIBooks(){
      const Max = 10;
      let length;
      if(Max < this.books.length){
        length = Max;
      }else{
        length = this.books.length;
      }

      this.UIbooks = new Array<Book>();
      console.log(this.UIbooks);
      for(let i = 0 ;i< length ; i++){
        this.UIbooks[i] = this.books[i];
      }
    }


  private insertBooksForView(books){

    this.books = [];
    let newBook :Book;
    
    for(let book of books){
      this.books.push(new Book(book));
    } 
  this.checkBooksQuantity();
 }

 private checkBooksQuantity(){
   let arr = JSON.parse(localStorage.getItem('myCart'));
   if(arr == undefined) return;
   this.books.forEach((book) =>{
      arr.forEach((item)=>{
        if(book.id == item.id){
          book.cartQuantity = item.cartQuantity;
        }
      });
   });
   
 }

}//end class






