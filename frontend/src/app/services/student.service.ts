import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private client:HttpClient) { }

  checkEmail(email:string){
    return this.client.get<boolean>("http://localhost:8080/student/checkEmail?email=" + email);
  }

  edit(s:Student){
    return this.client.post("http://localhost:8080/student/editStudent", s);
  }

  allProfessorsWithWorksWith(n:number){
    return this.client.get<Professor[]>("http://localhost:8080/professor/worksWith?age=" + n);
  }

  getAllStudents(){
    return this.client.get<Student[]>("http://localhost:8080/student/allStudents");
  }

  getAverageGrade(id:number){
    return this.client.get<number>("http://localhost:8080/student/average?id=" + id);
  }

  getAllStudentsForProf(id:number){
    return this.client.get<Student[]>("http://localhost:8080/student/allStudentsForProf?idProf=" + id)
  }

  getStudentsByAge(idAge:number){
    return this.client.get<Student[]>("http://localhost:8080/student/getStudentsByAge?idAge=" + idAge);
  }
}
