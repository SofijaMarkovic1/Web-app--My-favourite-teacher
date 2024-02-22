import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/Student';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  students:Student[] = [];
  constructor(private router:Router, private studentService:StudentService){}
  ngOnInit(): void {
      this.studentService.getAllStudents().subscribe(data=>{
        this.students = data;
      })
  }

  logout(){
    localStorage.removeItem("admin");
    this.router.navigateByUrl("/");
  }
}
