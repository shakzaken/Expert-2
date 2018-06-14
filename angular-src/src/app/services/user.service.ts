import { config } from './../config/config';


import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class UserService {

  User;
  
  usersUrl=`${config.serverUrl}users`;

    constructor(private http: HttpClient) {

    }


   public getUsers(){
     return this.http.get(this.usersUrl);
   }

   public CreateUser(user : User) {
      return this.http.post(`${this.usersUrl}/register`,user);
   }

   public deleteUser(id : string) {
     return this.http.delete(this.usersUrl +'/'+id);
   }


}
