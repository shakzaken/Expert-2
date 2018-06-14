import { HttpClient } from '@angular/common/http';
import { config } from './../config/config';
import { Injectable } from '@angular/core';
import {BookForm} from '../models/models';


@Injectable()
export class BooksService {

  
  booksUrl;

  constructor(private http : HttpClient) {
    
    this.booksUrl = `${config.serverUrl}books`; 
   }


   public getBooks() {
     return this.http.get(this.booksUrl);
   }

   public createBook(book : any)
   {
      return this.http.post(`${this.booksUrl}/add`,book);
   }
   public deleteBook(id : number) {
     return this.http.delete(this.booksUrl +'/'+id);
   }

   public createImg(file:File, book:BookForm){
     
     let fd = new FormData();
     fd.append('myfile',file);
     fd.append('name',book.name);
     fd.append('quantity',book.quantity.toString());
     fd.append('price',book.price.toString());
     fd.append('description',book.description);
     fd.append('category',book.category);
     
     return this.http.post(`${this.booksUrl}/img`,fd);
     
   }


   
  

}
