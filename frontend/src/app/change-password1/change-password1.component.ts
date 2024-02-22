import { NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../models/User';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password1',
  templateUrl: './change-password1.component.html',
  styleUrls: ['./change-password1.component.css']
})
export class ChangePassword1Component {
  errorMessage:string="";
  page:number=0;
  username:string="";
  answer:string="";
  newPassword:string="";
  newPassword1:string="";
  u:User;
  constructor(private loginService:LoginServiceService, private router:Router){}

  next(){
    this.errorMessage="";
    if(this.page==0){
      if(this.username==""){
        this.errorMessage="You must enter a valid username.";
        return;
      }
      this.loginService.checkUsername(this.username).subscribe(data=>{
        if(data==null){
          this.errorMessage="You must enter a valid username.";
          return;
        }
        this.u=data;
        this.page=1;
      })
    }
    else if(this.page==1){
      if(this.answer=="" || this.answer!=this.u.safetyAnswer){
        this.errorMessage="Incorrect answer.";
        return;
      }
      this.page++;
    }
    else if(this.page==2){
      if(this.newPassword=="" || this.newPassword1==""){
        this.errorMessage="Both fields are required.";
        return;
      }
      if(this.newPassword!=this.newPassword1){
        this.errorMessage="Both fields are required.";
        return;
      }
      const regex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@#$%^&+=]).{6,10}$/;
      if (!(regex.test(this.newPassword) && /^[a-zA-Z]/.test(this.newPassword))){
        this.errorMessage = "Invalid new password. Password must contain 6-10 characters, at least 1 capital, 3 small, 1 number, 1 special character and must start with a letter.";
        return;
      }
      this.u.password = this.newPassword;
      this.loginService.changePassword(this.u).subscribe();
      this.router.navigateByUrl("/");
    }
  }
}
