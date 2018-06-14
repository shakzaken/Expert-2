import { Book } from './../models/book';
import { config } from './../config/config';
import { Injectable } from '@angular/core';


@Injectable()
export class CartService {

  constructor() {}
   
   getMyCart(){
     return JSON.parse(localStorage.getItem('myCart'));
   }

   deleteItem(id: String){
     let arr;
     let index;
     arr = JSON.parse(localStorage.getItem('myCart'));
     index = arr.findIndex((bookVal)=>{
       return bookVal.id == id
     });
     arr.splice(index,1);
     localStorage.setItem('myCart',JSON.stringify(arr));

   }


   addToCart(book : Book) {
    let arr;
    let bookIndex;
    let quantity;

    arr = JSON.parse(localStorage.getItem('myCart'));
    if(arr == null){
      arr = [];
    }
    bookIndex = arr.findIndex((bookVal)=>{
      return bookVal.id == book.id
    });
    if(bookIndex != -1){
      arr[bookIndex].cartQuantity += 1;
      quantity = arr[bookIndex].cartQuantity;
    }else{
      book.cartQuantity+=1;
      arr.push(book);
      quantity = book.cartQuantity;
    }
    localStorage.setItem('myCart',JSON.stringify(arr));
    return quantity;
  }

  
  decToCart(book: Book) {
    let arr;
    let bookIndex;
    let quantity = 0;

    arr = JSON.parse(localStorage.getItem('myCart'));
    if(arr == null){
      return quantity;
    }
    bookIndex = arr.findIndex((bookVal)=>{
      return bookVal.id == book.id
    });
    if(bookIndex != -1){
      arr[bookIndex].cartQuantity -= 1;
      quantity = arr[bookIndex].cartQuantity;
      if(quantity == 0){
        arr.splice(bookIndex,1);
      }
    }
    localStorage.setItem('myCart',JSON.stringify(arr));
    return quantity;
  }



}
