import { Component, OnInit } from '@angular/core';
import { Professor } from '../models/Professor';
import { Student } from '../models/Student';
import { PastClass } from '../models/PastClass';
import { ClassService } from '../services/class.service';
import { Subject } from '../models/Subject';
import { ProffesorService } from '../services/proffesor.service';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  professor:Professor;
  student:Student;
  pastClasses:PastClass[] = [];
  subjects:Subject[] = [];
  showSubject: boolean[] = [];
  errorMessage:string = "";
  inFocus:PastClass;
  comment:string="";
  gradeVal:number=0;

  constructor(private classService:ClassService, private professorService:ProffesorService, private router:Router){}

  ngOnInit(): void {
      let p = localStorage.getItem("professor");
      if(p==null) return;
      this.professor = JSON.parse(p);
      let s = localStorage.getItem("studentDetails");
      if(s==null) return;
      this.student = JSON.parse(s);
      this.classService.getPastClassesForStudentAndProf(this.student.userid, this.professor.userid).subscribe(data=>{
        this.pastClasses = data;
        this.professorService.getSubjectsForProfessor(this.professor.userid).subscribe(data1=>{
          this.subjects = data1;
          this.subjects.forEach(s => {
            let flag=false;
            this.pastClasses.forEach(p=>{
              if(p.idsubject==s.idsubject) flag=true;
            })
            if(flag) this.showSubject.push(true);
            else this.showSubject.push(false);
          });
        })
      })
  }
  logout(){
    localStorage.removeItem("professor");
    this.router.navigateByUrl("/");
  }
  grade(){
    this.errorMessage="";
    if(this.gradeVal==0){
      this.errorMessage="Field grade is required.";
    }
    this.inFocus.professorGrade = this.gradeVal;
    this.classService.rateStud(this.inFocus).subscribe(data=>{
      this.ngOnInit();
    })
  }
  leaveComment(){
    this.errorMessage="";
    if(this.comment==""){
      this.errorMessage="Field comment is required.";
    }
    this.inFocus.professorComment = this.comment;
    this.classService.leaveACommentProf(this.inFocus).subscribe(data=>{
      this.ngOnInit();
    })
  }

  openCommentModal(p:PastClass) {
    this.inFocus = p;
    this.errorMessage="";
    const modalElement = document.getElementById('commentModal');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
    modal.show();
  }
  openGradeModal(p:PastClass) {
    this.inFocus = p;
    this.errorMessage="";
    const modalElement = document.getElementById('gradeModal');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
    modal.show();
  }

}
