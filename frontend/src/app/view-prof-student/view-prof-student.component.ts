import { Component, OnInit } from '@angular/core';
import { Professor } from '../models/Professor';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ProffesorService } from '../services/proffesor.service';
import { Subject } from '../models/Subject';
import { Class } from '../models/Class';
import { Student } from '../models/Student';

@Component({
  selector: 'app-view-prof-student',
  templateUrl: './view-prof-student.component.html',
  styleUrls: ['./view-prof-student.component.css']
})
export class ViewProfStudentComponent implements OnInit {
  proffesor:Professor;
  worksWith:string="";
  errorMessage:string="";
  message:string="";
  subjects:Subject[] = [];
  selectedSubject:number = -1;
  topic:string="";
  double:boolean = false;
  dateTime:string;
  s:Student;
  avg:number;
  comments:string[] = [];

  constructor(private router:Router, private proffesorService:ProffesorService){}

  ngOnInit(): void {
      let p = localStorage.getItem("savedProf");
      if(p!=null){
        this.proffesor = JSON.parse(p);
        this.proffesorService.worksWith(this.proffesor.userid).subscribe(data=>{
          this.worksWith = data.join(", ");
          this.proffesorService.getSubjectsForProfessor(this.proffesor.userid).subscribe(data=>{
            this.subjects = data;
            let x = localStorage.getItem("student");
            if(x!=null){
              this.s = JSON.parse(x);
            }
            else return;
            this.proffesorService.averageGrade(this.proffesor.userid).subscribe(data1=>{
              this.avg = data1;
              this.proffesorService.comments(this.proffesor.userid).subscribe(data2=>{
                this.comments = data2;
                console.log(this.comments);
              })
            })
          })
        })
      }
  }
  back(){
    this.router.navigateByUrl("/studentProfs");
  }
  logout(){
    localStorage.removeItem("student");
    this.router.navigateByUrl("/");
  }

  openScheduleClassModal() {
    this.errorMessage="";
    // Otvorite modal koristeći Bootstrap JavaScript API
    const modalElement = document.getElementById('editProfileModal');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
  
  // Prikazivanje moda
    modal.show();
  }

  scheduleClass(){
    const selectedDate = new Date(this.dateTime);
    const isoDateString = selectedDate.toISOString().replace("Z", "");
    this.errorMessage="";
    this.message="";
    if(this.dateTime==null || this.topic=="" || this.selectedSubject==-1){
      this.errorMessage="All fields are required.";
      return;
    }
    if(selectedDate<=new Date()){
      this.errorMessage="Date and time are invalid.";
      return;
    }
    if(selectedDate.getDay()==6 || selectedDate.getDay()==0){
      this.errorMessage="Professor doesn't work during weekends.";
      return;
    }
    this.proffesorService.isProfessorFree(this.proffesor.userid, isoDateString, this.double).subscribe(data=>{
      if(data==0){
        const selectedDate1 = new Date(this.dateTime);
        const isoDateString1 = selectedDate1.toISOString().replace("Z", "");
        let d = new Date(this.dateTime);
        d.setHours(d.getHours() + 1);
        d.setMinutes(d.getMinutes() + 30);
        if(this.double){
          d.setHours(d.getHours() + 1);
          d.setMinutes(d.getMinutes() + 30);
        }
        const selectedDate2 = d;
        const isoDateString2 = selectedDate2.toISOString().replace("Z", "");
        let c:Class = new Class(-1, this.proffesor.userid, this.selectedSubject, this.s.userid, isoDateString1, isoDateString2, false, this.topic);
        this.proffesorService.insertClass(c).subscribe(data=>{
          if(data==0){
            this.message="Class is scheduled.";
          }
        })
        return;
      }
      else if(data==-1){
        this.errorMessage="Out of working hours.";
        return;
      }
      else if(data==-2){
        this.errorMessage="Professor has another class in that time.";
        return;
      }
      else if(data==-3){
        this.errorMessage="Out of working hours.";
        return;
      }
      else{
        this.errorMessage="Error.";
        return;
      }
    })
  }
}
