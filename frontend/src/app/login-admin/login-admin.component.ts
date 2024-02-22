import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  email:string="";
  password:string="";
  user:User;
  errorMessage:string="";
  constructor(private loginService:LoginServiceService, private router:Router) {}

  login(){
    if(this.email=="" || this.password==""){
      this.errorMessage="All fields are required."
      return;
    }
    this.loginService.loginAdmin(this.email, this.password).subscribe(data=>{
      if(data==null){
        this.errorMessage="Invalid credentials."
        return;
      }
      this.user = data;
      localStorage.setItem("admin", JSON.stringify(this.user));
      this.router.navigateByUrl("/adminHome");
    })
  }
}
