import { config } from './../config/config';

import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'

@Injectable()
export class CategoriesService {

  
  categoriesUrl = `${config.serverUrl}categories`;
  constructor(private http : HttpClient) {

   }

   public createCategory(category : string) {
    return this.http.post(`${this.categoriesUrl}/add`,category);
   }

   public getCategories() {
     return this.http.get(this.categoriesUrl);
   }


   public deleteCategory(id:number) {
     return this.http.delete(this.categoriesUrl+"/"+id);
   }


}
