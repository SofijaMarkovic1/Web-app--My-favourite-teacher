import { Component, OnInit } from '@angular/core';
import { Professor } from '../models/Professor';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NewSubject } from '../models/NewSubject';
import { Subject } from '../models/Subject';
import { Teaches } from '../models/Teaches';
import { CV } from '../models/CV';
import { RegisterProfessorServiceService } from '../services/register-professor-service.service';

@Component({
  selector: 'app-admin-professors',
  templateUrl: './admin-professors.component.html',
  styleUrls: ['./admin-professors.component.css']
})
export class AdminProfessorsComponent implements OnInit {
  professors:Professor[] = [];
  newSubjects:NewSubject[] = [];
  cvs:CV[] = [];
  errorMessage:string="";
  newSubjectName:string="";
  constructor(private router:Router, private adminService:AdminService, private register:RegisterProfessorServiceService){}
  ngOnInit(): void {
      this.adminService.getAllProfessors().subscribe(data=>{
        this.professors = data;
        this.professors.forEach(p => {
          this.register.getCV(p.userid).subscribe(data2=>{
            console.log(data2);
            this.cvs.push(data2);
            if(this.professors.indexOf(p)==this.professors.length-1){
              this.adminService.getNewSubjects().subscribe(data1=>{
                this.newSubjects = data1;
              })
            }
          })
        });
      })
  }

  deactivateProfessor(id:number){
    this.adminService.deactivateProfessor(id).subscribe(data=>{
      this.ngOnInit();
    })
  }
  activateProfessor(id:number){
    this.adminService.activateProfessor(id).subscribe(data=>{
      this.ngOnInit();
    })
  }
  declineProfessor(id:number){
    this.adminService.declineProfessor(id).subscribe(data=>{
      this.ngOnInit();
    })
  }

  getProfessorWithId(id:number){
    return this.professors.find(p=>p.userid==id).name + " " + this.professors.find(p=>p.userid==id).surname;
  }

  acceptNewSubject(n:NewSubject){
    this.adminService.addSubject(n.name).subscribe(data=>{
      let subject:Subject = data;
      this.adminService.addTeaches(new Teaches(n.idprofessor, subject.idsubject)).subscribe(data1=>{
        this.adminService.deleteNewSubject(n).subscribe(data1=>{
          this.ngOnInit();
        })
      })
    })
  }
  declineNewSubject(n:NewSubject){
    this.adminService.deleteNewSubject(n).subscribe(data=>{
      this.ngOnInit();
    })
  }
  insert(){
    this.errorMessage="";
    if(this.newSubjectName==""){
      this.errorMessage = "Subjects name is required.";
      return;
    }
    this.adminService.addSubject(this.newSubjectName).subscribe(data=>{
      this.newSubjectName="";
    });
  }

  logout(){
    localStorage.removeItem("admin");
    this.router.navigateByUrl("/");
  }
}
