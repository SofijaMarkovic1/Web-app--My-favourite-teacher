import { Component, OnInit } from '@angular/core';
import { Professor } from '../models/Professor';
import { Class } from '../models/Class';
import { ClassService } from '../services/class.service';
import * as bootstrap from 'bootstrap';
import { Student } from '../models/Student';
import { Subject } from '../models/Subject';
import { SubjectServiceService } from '../services/subject-service.service';
import { StudentService } from '../services/student.service';
import { Notification } from '../models/Notification';
import { Time } from '@angular/common';
import { WorkingHours } from '../models/WorkingHours';
import { ProffesorService } from '../services/proffesor.service';
import { Router } from '@angular/router';
import { WorksWith } from '../models/WorksWith';
import { AgeServiceService } from '../services/age-service.service';

@Component({
  selector: 'app-professor-classes',
  templateUrl: './professor-classes.component.html',
  styleUrls: ['./professor-classes.component.css']
})
export class ProfessorClassesComponent implements OnInit {
  professor:Professor;
  incoming:Class[] = [];
  in4hrs:Class[] = [];
  requests:Class[] = [];
  show:number;
  students:Student[] = [];
  subjects:Subject[] = [];
  in15mins:Class[] = [];
  errorMessage = "";
  reason = "";
  cancelingClass:Class;
  averages:number[] = [];
  startTime:string = "";
  endTime:string = "";
  date:string = "";
  dayOff:boolean = false;
  message:string = "";
  mySubjects:Subject[] = [];
  worksWith:WorksWith[] = [];
  studentGroups:Student[][] = [];
  ageNames:String[] = [];
  selectedAge:number;
  selectedStudents:number[] = [];
  selectedSubject:number;
  timeStart:string="";
  timeEnd:string="";
  double:boolean;
  topic:string="";
  groupClasses:Class[] = [];

  constructor(private classService:ClassService, private subjectService:SubjectServiceService, private studentService:StudentService, private professorService:ProffesorService, private router:Router, private ageService:AgeServiceService){}

  ngOnInit(): void {
      let p = localStorage.getItem("professor");
      if(p==null) return;
      this.professor = JSON.parse(p);
      this.classService.getProfessorsIncomingClasses(this.professor.userid).subscribe(data=>{
        this.incoming = data;
        this.classService.getRequests(this.professor.userid).subscribe(data1=>{
          this.requests = data1;
          this.classService.getIn4Hours(this.professor.userid).subscribe(data2=>{
            this.in4hrs = data2;
            if(this.incoming.length<5) this.show = this.incoming.length;
            else this.show = 5;
            this.subjectService.getAllSubjects().subscribe(data3=>{
              this.subjects = data3;
              this.studentService.getAllStudents().subscribe(data4=>{
                this.students = data4;
                this.classService.getClassesIn15minProf(this.professor.userid).subscribe(data5=>{
                  this.in15mins = data5;
                  this.requests.forEach(r => {
                    this.studentService.getAverageGrade(r.idstudent).subscribe(data6=>{
                      this.averages.push(data6);
                    })
                  });
                  this.professorService.getSubjectsForProfessor(this.professor.userid).subscribe(data7=>{
                    this.mySubjects = data7;
                    this.ageService.getWorksWith(this.professor.userid).subscribe(data8=>{
                      this.worksWith = data8;
                      this.worksWith.forEach(ww => {
                        this.studentService.getStudentsByAge(ww.idage).subscribe(data9=>{
                          this.studentGroups.push(data9);
                          if(ww.idage==1){
                            this.ageNames.push("Primary 1-4");
                          }
                          else if(ww.idage==2){
                            this.ageNames.push("Primary 5-8");
                          }
                          else{
                            this.ageNames.push("Highschoolers");
                          }
                        })
                      });
                    this.professorService.getGroupClasses(this.professor.userid).subscribe(data10=>{
                      data10.forEach(c => {
                        if(this.groupClasses.find(cl=>cl.codeForGroupClass==c.codeForGroupClass)==undefined){
                          this.groupClasses.push(c);
                        }
                      });
                    })
                    })
                  })
                })
              })
            })
          })
        })
      })
  }
  vratiStudSaId(id:number){
    return this.students.find(s=>s.userid==id).name + " "+  this.students.find(s=>s.userid==id).surname;
  }
  vratiPredmetSaId(id:number){
    return this.subjects.find(s=>s.idsubject==id).name;
  }
  openCommentModal(c:Class) {
    this.cancelingClass = c;
    const modalElement = document.getElementById('cancelClass');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
    modal.show();
  }

  openDeclineModal(c:Class) {
    this.cancelingClass = c;
    const modalElement = document.getElementById('declineClass');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
    modal.show();
  }
  openScheduleClass() {
    const modalElement = document.getElementById('groupClass');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
    modal.show();
  }
  more(){
    if(this.show == 5 && this.incoming.length>=10) this.show=10;
    else if(this.show == 5 && this.incoming.length<10) this.show = this.incoming.length; 
    else if(this.show=10) this.show = this.incoming.length; 
  }

  isIn4hrs(id:number){
    if(this.in4hrs.find(i=>i.idclass==id)!=null) return true;
    else return false;
  }
  isIn15mins(id:number){
    if(this.in15mins.find(i=>i.idclass==id)!=null) return true;
    else return false;
  }

  cancelClass(){
    this.errorMessage = "";
    if(this.reason==""){
      this.errorMessage = "You must write a reason for canceling this class.";
      return;
    }
    this.classService.cancelClass(this.cancelingClass).subscribe(data=>{
      let txt = this.professor.name + " " + this.professor.surname + " canceled Your " + this.vratiPredmetSaId(this.cancelingClass.idsubject) + " on " + this.cancelingClass.dateAndTimeStart + ". Reason: " + this.reason;
      this.classService.createNotif(new Notification(-1, this.cancelingClass.idstudent, this.cancelingClass.idsubject, this.cancelingClass.idprofessor, txt, false)).subscribe(data1=>{
        const modalElement = document.getElementById('cancelClass');
        const modal = new bootstrap.Modal(modalElement, { centered: true });
        modal.hide();
        this.ngOnInit();
      })
    })
  }
  declineClass(){
    this.errorMessage = "";
    if(this.reason==""){
      this.errorMessage = "You must write a reason for declining this class.";
      return;
    }
    this.classService.declineClass(this.cancelingClass).subscribe(data=>{
      let txt = this.professor.name + " " + this.professor.surname + " declined Your request for " + this.vratiPredmetSaId(this.cancelingClass.idsubject) + " class on " + this.cancelingClass.dateAndTimeStart + ". Reason: " + this.reason;
      this.classService.createNotif(new Notification(-1, this.cancelingClass.idstudent, this.cancelingClass.idsubject, this.cancelingClass.idprofessor, txt, false)).subscribe(data1=>{
        const modalElement = document.getElementById('cancelClass');
        const modal = new bootstrap.Modal(modalElement, { centered: true });
        modal.hide();
        this.ngOnInit();
      })
    })
  }

  acceptClass(c:Class){
    this.classService.acceptClass(c).subscribe(data=>{
      console.log(c);
      let txt = this.professor.name + " " + this.professor.surname + " accepted Your request for " + this.vratiPredmetSaId(c.idsubject) + " class on " + c.dateAndTimeStart + ".";
      this.classService.createNotif(new Notification(-1, c.idstudent, c.idsubject, c.idprofessor, txt, false)).subscribe(data1=>{
        this.ngOnInit();
      })
    })
  }

  submitWorkingHours(){
    this.errorMessage="";
    if(this.date==null){
      this.errorMessage="All fields are required.";
      return;
    }
    if(this.dayOff==false && (this.startTime==null || this.endTime==null)){
      this.errorMessage="All fields are required.";
      return;
    }
    let d = new Date(this.date);
    d.setHours(0,0,0,0);
    if(d<=new Date()){
      this.errorMessage="You can't select date in the past.";
      return;
    }
    alert(this.dayOff);
    if(this.dayOff){
      this.startTime="";
      this.endTime="";
    }
    let w = new WorkingHours(-1, this.professor.userid, this.date, this.startTime, this.endTime);
    this.professorService.insertWorkingHours(w).subscribe(data=>{
      if(data==-1){
        this.errorMessage="You already scheduled classes for that day.";
        return;
      }
      this.startTime = "";
      this.endTime = "";
      this.date = "";
      this.dayOff = false;
      this.message = "Your working hours are submited.";
      this.ngOnInit();
    });
  }
  logout(){
    localStorage.removeItem("professor");
    this.router.navigateByUrl("/");
  }

  joinClass(i:Class){
    localStorage.setItem("class", JSON.stringify(i));
    this.router.navigateByUrl("/joinClassProfessor");
  }

  scheduleGroup(){
    this.errorMessage="";
    if(this.selectedStudents.length<2){
      this.errorMessage="You need invite at least 2 students.";
      return;
    }
    const selectedDate = new Date(this.startTime);
    const isoDateString = selectedDate.toISOString().replace("Z", "");
    if(selectedDate<=new Date()){
      this.errorMessage="Date and time are invalid.";
      return;
    }
    if(this.selectedSubject==undefined){
      this.errorMessage="You must select a class.";
      return;
    }
    const selectedDate1 = new Date(this.startTime);
    const isoDateString1 = selectedDate1.toISOString().replace("Z", "");
    let d = new Date(this.startTime);
    d.setHours(d.getHours() + 1);
    if(this.double){
      d.setHours(d.getHours() + 1);
    }
    const selectedDate2 = d;
    const isoDateString2 = selectedDate2.toISOString().replace("Z", "");
    let code="" + this.professor.userid;
    this.selectedStudents.forEach(s => {
      code += ("" + s);
    });
    this.selectedStudents.forEach(s => {
      let c:Class = new Class(-1, this.professor.userid, this.selectedSubject, s, isoDateString1, isoDateString2, true, this.topic);
      c.codeForGroupClass = code;
      this.professorService.insertGroupClass(c).subscribe(data=>{
        if(data!=0){
          alert('error');
          return;
        }
        let txt = this.professor.name + " " + this.professor.surname + " invited You to a group " + this.vratiPredmetSaId(c.idsubject) + " class on " + c.dateAndTimeStart + ".";
        this.classService.createNotif(new Notification(-1, c.idstudent, c.idsubject, c.idprofessor, txt, false)).subscribe(data1=>{
          
        })
      })
    });
    this.message="Class is scheduled";
    this.ngOnInit();
  }
  dodajStudenta(id:number){
    if(this.selectedStudents.find(i=>i==id)!=undefined){
      this.selectedStudents = this.selectedStudents.filter(i=>i!=id);
    }
    else{
      this.selectedStudents.push(id);
    }
  }
  
}
