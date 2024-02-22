import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { User } from '../models/User';
import { Student } from '../models/Student';
import { Professor } from '../models/Professor';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string = "";
  password:string = "";
  errorMessage:string = "";
  user:User;
  student:Student;
  professor:Professor;

  constructor(private loginService:LoginServiceService, private router:Router){}

  login(){
    this.errorMessage = "";
    if(this.email=="" ||  this.password==""){
      this.errorMessage = "All fields are required."
      return;
    }
    this.loginService.checkUser(this.email, this.password).subscribe(data=>{
      if(data==null){
        this.errorMessage="Invalid credentials.";
        return;
      }
      this.user = data;
      if(this.user.type==1){
        this.loginService.getStudent(this.user.userid).subscribe(data1=>{
          this.student = data1;
          localStorage.setItem("student", JSON.stringify(this.student));
          this.router.navigateByUrl("studentProfile");
        })
      }
      else{
        this.loginService.getProfessor(this.user.userid).subscribe(data2=>{
          if(data2==null){
            this.errorMessage = "Account on pending."
            return;
          }
          this.professor = data2;
          localStorage.setItem("professor", JSON.stringify(this.professor));
          this.router.navigateByUrl("professorProfile");
        })
      }
    });
  }


}
