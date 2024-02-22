import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { User } from '../models/User';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  errorMessage:string="";
  email:string="";
  oldpassword:string="";
  newpassword1:string="";
  newpassword:string="";
  user:User;
  constructor(private loginService:LoginServiceService, private router:Router){}
  change(){
    if(this.email=="" || this.oldpassword=="" || this.newpassword1=="" || this.newpassword==""){
      this.errorMessage = "All fields are required."
      return;
    }
    if(this.newpassword!=this.newpassword1){
      this.errorMessage = "New password is not the same in both fields."
      return;
    }
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@#$%^&+=]).{6,10}$/;
    if (!(regex.test(this.newpassword) && /^[a-zA-Z]/.test(this.newpassword))){
      this.errorMessage = "Invalid new password. Password must contain 6-10 characters, at least 1 capital, 3 small, 1 number, 1 special character and must start with a letter.";
      return;
    }
    this.loginService.checkUser(this.email, this.oldpassword).subscribe(data=>{
      if(data==null){
        this.errorMessage="Invalid credentials.";
        return;
      }
      this.user = data;
      this.user.password = this.newpassword;
      this.loginService.changePassword(this.user).subscribe(data=>{
        this.router.navigateByUrl("/");
      })
    });
  }
}
