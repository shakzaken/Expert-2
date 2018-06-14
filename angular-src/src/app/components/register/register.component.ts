
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component, OnInit ,NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Router } from '@angular/router';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User;
  errorsElements: RegisterErrors;
 
  constructor(
    private userService : UserService,
    private router : Router,
    private authService: AuthService) { 
      this.user = {
        firstName: '',
        lastName : '',
        email : '',
        password : '',
        confirmPassword: '',
        id: 0
      }
  }

  ngOnInit() {
    this.errorsElements = {
      firstName: document.getElementById('firstName-error'),
      lastName : document.getElementById('lastName-error'),
      email: document.getElementById('email-error'),
      password: document.getElementById('password-error'),
      confirmPassword: document.getElementById('confirmPassword-error')
    }

  }

  submit(){
    this.clearErrors();
    if(this.validateInput() == false){
      return;
    }
    
    this.authService.registerUser(this.user)
      .subscribe(user =>{
        console.log(user);
        this.router.navigate(['/login']);
      },err =>{
        if(err.error.type =='email'){
          this.errorsElements.email.innerHTML = err.error.msg;
        }
      });

  }

  private validateInput(){
    let flag = true;
    if(this.user.firstName ==''){
      flag = false;
      this.errorsElements.firstName.innerHTML = 'First Name is required';
    }
    if(this.user.lastName ==''){
      flag = false;
      this.errorsElements.lastName.innerHTML = 'Last Name is required';
    }
    if(this.user.email ==''){
      flag = false;
      this.errorsElements.email.innerHTML = 'Email is required';
    }
    if(this.user.password ==''){
      flag = false;
      this.errorsElements.password.innerHTML = 'password is required';
    }
    if(this.user.confirmPassword ==''){
      flag = false;
      this.errorsElements.confirmPassword.innerHTML = 'Confirm password is required';
    }
    if(flag == false){
      return flag;
    }

    if(this.user.password.length < 4){
      flag = false;
      this.errorsElements.password.innerHTML = 'Password should be at least 4 characters';
    }
    if(this.user.confirmPassword.length < 4){
      flag = false;
      this.errorsElements.confirmPassword.innerHTML = 'Confirm Password should be at least 4 characters';
    }

    if(this.validateEmail(this.user.email) == false){
      flag = false;
      this.errorsElements.email.innerHTML = 'Email is not valid';
    }
    if(flag == false){
      return flag;
    }


    if(this.user.password !== this.user.confirmPassword ){
      flag = false;
      this.errorsElements.password.innerHTML = 'Passwords don\'t match';
    }

    return flag;

  }
  


  private validateEmail(email){
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(re.test(email)){
      return true;
    }else{
      return false;
    }

  }

  private clearErrors(){
    this.errorsElements.email.innerHTML = '';
    this.errorsElements.firstName.innerHTML ='';
    this.errorsElements.lastName.innerHTML ='';
    this.errorsElements.password.innerHTML = '';
    this.errorsElements.confirmPassword.innerHTML = '';
  }


}




export interface RegisterErrors{
  firstName: Element,
  lastName: Element,
  email: Element,
  password: Element,
  confirmPassword: Element
}


