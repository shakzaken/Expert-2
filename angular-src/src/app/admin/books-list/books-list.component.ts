import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import {config} from '../../config/config';



@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books : any[];
  serverUrl;

  constructor(private booksService : BooksService ) { }

  ngOnInit() {

    this.serverUrl = config.serverUrl;
    this.booksService.getBooks()
      .subscribe((books :any []) => { this.books = books
        console.log(this.books);
      },
      err => console.log("Err ",err));

   
      
  }

  deleteBook(id) {
    console.log('deleteee');
    if (confirm("Are you sure you want to delete this book?")) {
    this.booksService.deleteBook(id)
      .subscribe(obj => {
        console.log(`Book deleted! ${obj}`)
        this.ngOnInit();
      },
         err => console.log(`Error ${err}`));
    }  
  }


 



}
