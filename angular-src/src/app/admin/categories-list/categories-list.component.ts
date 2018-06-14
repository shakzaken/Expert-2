import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories : any[];
  constructor(private categoriesService : CategoriesService) {

   }

  ngOnInit() {

    this.categoriesService.getCategories()
      .subscribe((list:any[]) => {
        this.categories = list;
      });

  }


  deleteCategory(id : number) {
    if(confirm("Are you sure you want to delete this category?")) {
    this.categoriesService.deleteCategory(id)
      .subscribe(res => {
        console.log("deleted! ",res)
        this.ngOnInit();    
    });
  }}
   

}
