import { CategoriesService } from './../../services/categories.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit ,NgModule } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category;
  errorElement: Element;
  constructor(private categoriesService : CategoriesService , 
              private  router : Router) {
    this.category= {
      name:""
    }
   }

  ngOnInit() {
    this.errorElement = document.querySelector('.name-error');
  }

  submit(f) {
    if(this.checkErrors() == false){
      return false;
    }
    this.categoriesService.createCategory(this.category)
      .subscribe(res => {
          this.router.navigate(["/admin/categories-list"])
        } ,err => console.log("err ---- ",err));
                  
  }



  private checkErrors(){
    if(this.category.name == ''){
      this.errorElement.innerHTML = 'name is required';
      return false;
    }

    if(this.category.name.length > 255){
      this.errorElement.innerHTML ='name should be lower than 256 characters';
      return false;
    }

    return true;
  }

}
