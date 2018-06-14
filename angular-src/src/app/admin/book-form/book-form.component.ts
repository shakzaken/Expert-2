

import { BooksService } from './../../services/books.service';
import { element } from 'protractor';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {BookForm,User} from '../../models/models';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  categories : any[];
  book: BookForm;
  errors : any[];
  errorsElements: BookErrorsElements;
  @ViewChild('fileInput') fileInput:ElementRef;
  

    
  constructor(
      private categoriesService : CategoriesService , 
      private booksService : BooksService ,
      private router: Router) {
        
   }

  ngOnInit() {
    
    this.book = new BookForm();
    this.initErrorsArray();
    this.categoriesService.getCategories()
      .subscribe((res:any[]) =>{ this.categories = res
      },err => console.log(err));      
  }

  submit() {
 
    if(this.checkFormErrors() == false) {
      return false;
    }    
    this.CreateBook();

    
  }



  private CreateBook(){  
     var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
     let file = nativeElement.files[0];

     
     this.booksService.createImg(file,this.book)
      .subscribe(res =>{
        console.log(res)
        this.router.navigate(["/admin/books-list"]);
      },err =>console.log(err));
              
  }

  onLoadFile(){
    var preview = document.querySelector('img'); //selects the query named img
    
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    let file = nativeElement.files[0];//sames as here

    console.log(file);
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}
  
  
 

  private checkFormErrors(){
    let flag = true;
    this.clearErrors();

    for(let prop in this.book){
      if(this.book[prop] == ''){
        if(this.errorsElements[prop]){
          flag = false;
          this.errorsElements[prop].innerHTML = `${prop} is required`;
        }
      }
    }

    let price = Number(this.book.price);
    let quantity = Number(this.book.quantity);

    if(flag == false){
      return flag;
    }

    if(Number.isNaN(price)){
      flag = false;
      this.errorsElements.price.innerHTML = 'price should be a number';
    }
    if(Number.isNaN(quantity)){
      flag = false;
      this.errorsElements.quantity.innerHTML = 'quantity should be a number';
    }
    if(price < 1 || price > 1000){
      flag = false;
      this.errorsElements.price.innerHTML = 'price should be between 1 to 1000';
    }
    if(quantity < 1 || quantity > 1000){
      flag = false;
      this.errorsElements.quantity.innerHTML = 'quantity should be between 1 to 1000';
    }

    if(this.book.name.length > 255){
      flag = false;
      this.errorsElements.name.innerHTML = 'name should be lower than 256 charcters';
    }
    if(this.book.description.length > 1024){
      flag = false;
      this.errorsElements.description.innerHTML = 'name should be lower than 1025 charcters';
    }

    return flag;

  }


  private clearErrors(){
    for(let prop in this.errorsElements){
      this.errorsElements[prop].innerHTML = '';
    }
  }

  private initErrorsArray(){
    this.errorsElements = {
      name : document.querySelector('.name-errors'),
      description : document.querySelector('.description-errors'),
      price : document.querySelector('.price-errors'),
      quantity : document.querySelector('.quantity-errors'),
      category: document.querySelector('.category-errors')
    };

  }


}/* ---------------- End book-form component -------------*/


export interface BookErrorsElements{
  name:Element,
  description:Element,
  price:Element,
  quantity:Element,
  category:Element

}