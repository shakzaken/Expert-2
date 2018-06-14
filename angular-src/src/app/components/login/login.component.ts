import { NavService } from './../../services/nav.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { loginUser } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser : loginUser;
  errors : any[];
  emailError : Element;
  passwordError : Element;

  constructor(
    private authService : AuthService,
    private router : Router,
    private navService: NavService) {
      
      this.loginUser = {
        email:'',
        password:''
      }
    
   }

  ngOnInit() {
    this.errors = [];
    this.navService.checkUrl();
    this.emailError = document.querySelector('.email-error');
    this.passwordError = document.querySelector('.password-error');
    

  }

  submit() {
    this.clearValidation();
    if(this.validateInput() == false){
      return;
    }
      
    this.authService.authenticateUser(this.loginUser)
      .subscribe((res:any) =>{
          this.authService.storeUserData(res.token,res.user);
          this.router.navigate(['/']);
      },err =>{
        this.serverValidation(err.error);
      });
    
  }


  private validateInput(){
    let flag = true; 

    if(this.loginUser.email == ''){
      this.emailError.innerHTML = 'Email is required';
      flag = false;
    }
    if(this.loginUser.password == ''){
      this.passwordError.innerHTML = 'Password is required';
      flag = false;
    }

    if(flag == true && this.validateEmail(this.loginUser.email) == false){
      this.emailError.innerHTML = 'Email is not Valid';
      flag = false;
    }


    return flag;
  }

  private clearValidation(){
    this.emailError.innerHTML = '';
    this.passwordError.innerHTML = '';
  }

  private serverValidation(error){
    if(error.type =='email-error'){
      this.emailError.innerHTML = error.msg;
    }
    if(error.type =='password-error'){
      this.passwordError.innerHTML = error.msg;
    }
  }

  private validateEmail(email){
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(re.test(email)){
      return true;
    }else{
      return false;
    }

  }

}
