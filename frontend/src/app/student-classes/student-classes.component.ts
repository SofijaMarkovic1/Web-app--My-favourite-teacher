import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { PastClass } from '../models/PastClass';
import { Student } from '../models/Student';
import * as bootstrap from 'bootstrap';
import { Professor } from '../models/Professor';
import { StudentService } from '../services/student.service';
import { Subject } from '../models/Subject';
import { SubjectServiceService } from '../services/subject-service.service';
import { Class } from '../models/Class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit {
  pastClasses:PastClass[] = [];
  student:Student;
  grade:number = -1;
  professors:Professor[] = [];
  subjects:Subject[] = [];
  inFocus:number;
  comment:string="";
  errorMessage="";
  incomingClasses:Class[] = [];
  in15min:Class[] = [];
  

  constructor(private classService:ClassService, private studentService:StudentService, private subjectService:SubjectServiceService, private router:Router){}

  ngOnInit(): void {
    this.comment = "";
    this.inFocus=-1;
    let x = localStorage.getItem("student");
    if(x==null) return;
    this.student = JSON.parse(x);
    this.classService.getPastClasses(this.student.userid).subscribe(data=>{
      this.pastClasses = data;
      let age:number = 0;
      if(this.student.grade<=4 && this.student.schoolType==1) age=1;
      else if(this.student.grade>4 && this.student.schoolType==1) age=2;
      else age=3;
      this.studentService.allProfessorsWithWorksWith(age).subscribe(data1=>{
        this.professors = data1;
        this.subjectService.getAllSubjects().subscribe(data2=>{
          this.subjects = data2;
          this.classService.getClasses(this.student.userid).subscribe(data3=>{
            this.incomingClasses = data3;
            this.classService.getClassesIn15min(this.student.userid).subscribe(data4=>{
              this.in15min = data4;
              console.log(data4);
              console.log(this.incomingClasses);
              console.log(data4.includes(this.incomingClasses[0]));
            })
          })
        })
      })
    });
  }

  logout(){
    localStorage.removeItem("student");
    this.router.navigateByUrl("/");
  }

  openRateModal(n:number) {
    this.inFocus = n;
    const modalElement = document.getElementById('rateModal');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
    modal.show();
  }
  openCommentModal(n:number) {
    this.inFocus = n;
    this.errorMessage="";
    const modalElement = document.getElementById('commentModal');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
    modal.show();
  }

  rate(n:number){
    this.grade=n;
  }

  submitGrade(){
    let pc:PastClass = this.pastClasses.find(pc=>pc.idpastclass==this.inFocus);
    pc.studentGrade = this.grade;
    this.classService.rateProf(pc).subscribe(data=>{
      this.ngOnInit();
    });

  }

  vratiProfSaId(id:number){
    return this.professors.find(prof=>prof.userid==id).name + " " +  this.professors.find(prof=>prof.userid==id).surname;
  }
  vratiPredmetSaId(id:number){
    return this.subjects.find(sub=>sub.idsubject==id).name;
  }
  leaveAComment(){
    this.errorMessage="";
    if(this.comment==""){
      this.errorMessage="Comment field is required.";
    }
    let pc:PastClass = this.pastClasses.find(pc=>pc.idpastclass==this.inFocus);
    pc.studentComment = this.comment;
    this.classService.leaveAComment(pc).subscribe(data=>{
      this.ngOnInit();
    });
  }

  za15min(i:Class){
    if(this.in15min.find(c=>c.idclass==i.idclass)!=undefined) return true;
    else return false;
  }

  joinClass(i:Class){
    localStorage.setItem("class", JSON.stringify(i));
    this.router.navigateByUrl("/joinClass");
  }
}
