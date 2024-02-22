import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Student } from '../models/Student';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private client:HttpClient) { }

  checkUser(email:string, password:string){
    return this.client.get<User>("http://localhost:8080/userLogin/checkUser?email=" + email + "&password=" + password);
  }
  getStudent(id:number){
    return this.client.get<Student>("http://localhost:8080/userLogin/getStudent?id=" + id);
  }
  getProfessor(id:number){
    return this.client.get<Professor>("http://localhost:8080/userLogin/getProfessor?id=" + id);
  }

  changePassword(u:User){
    return this.client.post("http://localhost:8080/userLogin/changePassword", u);
  }

  checkUsername(u:string){
    return this.client.get<User>("http://localhost:8080/userLogin/checkUsername?username=" + u);
  }
  loginAdmin(email:string, password:string){
    return this.client.get<User>("http://localhost:8080/userLogin/admin?email=" + email + "&password=" + password);
  }
}
