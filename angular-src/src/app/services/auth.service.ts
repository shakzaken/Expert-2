import { config } from './../config/config';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { tokenNotExpired} from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { loginUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  usersUrl = `${config.serverUrl}api/users`;

  authToken: any;
  user:any;
  serverUrl :string;
  host="remote";
  constructor(private http: HttpClient ) {
    this.serverUrl = config.serverUrl;
   }


  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(`${this.serverUrl}users/register`,user,{headers: headers});
      
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(`${this.serverUrl}users/authenticate`,user,{headers: headers});
      
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getUser(){
    return  JSON.parse(localStorage.getItem('user'));
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

 

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }
}
