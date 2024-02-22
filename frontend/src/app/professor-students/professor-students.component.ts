import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/Student';
import { Professor } from '../models/Professor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-students',
  templateUrl: './professor-students.component.html',
  styleUrls: ['./professor-students.component.css']
})
export class ProfessorStudentsComponent implements OnInit{
  professor:Professor;
  students:Student[] = [];
  constructor(private studentService:StudentService, private router:Router){}
  ngOnInit(): void {
      let p = localStorage.getItem("professor");
      if(p==null) return;
      this.professor = JSON.parse(p);
      this.studentService.getAllStudentsForProf(this.professor.userid).subscribe(data=>{
        this.students = data;
      })
  }
  logout(){
    localStorage.removeItem("professor");
    this.router.navigateByUrl("/");
  }
  saveStudent(s:Student){
    localStorage.setItem("studentDetails", JSON.stringify(s));
  }
}
