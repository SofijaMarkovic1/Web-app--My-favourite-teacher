import { Component, OnInit } from '@angular/core';
import { GuestServiceService } from '../services/guest-service.service';
import { Professor } from '../models/Professor';
import { Subject } from '../models/Subject';
import { Teaches } from '../models/Teaches';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  studentCnt:number;
  professorCnt:number;
  professors:Professor[] = [];
  subjects:Subject[] = [];
  teaches:Teaches[] = [];
  profToSub:string[][] = [];
  subToProf:string[][] = [];
  input:string="";
  allProfessors:Professor[]=[];
  namesAsc:boolean=true;
  subjectsAsc:boolean=true;
  numOfClasses:number[] = [];

  constructor(private guestService:GuestServiceService, private classService:ClassService){}

  ngOnInit(): void {
    this.guestService.getStudentCnt().subscribe(data=>{
      this.studentCnt = data;
      this.guestService.getProfessorCnt().subscribe(data1=>{
        this.professorCnt = data1;
        this.guestService.getAllProfessors().subscribe(data2=>{
          this.professors = data2;
          this.allProfessors = data2;
          this.guestService.getAllSubjects().subscribe(data3=>{
            this.subjects = data3;
            this.guestService.getAllTeaches().subscribe(data4=>{
              this.teaches = data4;
              this.professors.forEach(p => {
                let subs:string[] = [];
                this.subjects.forEach(s => {
                  this.teaches.forEach(t => {
                    if(t.idprofessor==p.userid && t.idsubject==s.idsubject) subs.push(s.name);
                  });
                });
                this.profToSub.push(subs);
              });
              this.subjects.forEach(s => {
                let profs:string[] = [];
                this.allProfessors.forEach(p => {
                  this.teaches.forEach(t => {
                    if(t.idprofessor==p.userid && t.idsubject==s.idsubject) profs.push(p.name + " " + p.surname);
                  });
                });
                this.subToProf.push(profs);
              });
              this.classService.numOfClasses().subscribe(data5=>{
                this.numOfClasses = data5;
              })
            })
          })
        })
      })
    })
  }


  searchProfessors() {
    if(this.input=="") this.professors=this.allProfessors;
    else{
      this.professors = [];
      this.allProfessors.forEach(p => {
        if(p.name.toLowerCase().includes(this.input.toLowerCase()) || p.surname.toLowerCase().includes(this.input.toLowerCase())) this.professors.push(p);
        this.teaches.forEach(t => {
          if(t.idprofessor==p.userid){
            this.subjects.forEach(s => {
              if(t.idsubject==s.idsubject && s.name.toLowerCase().includes(this.input.toLowerCase())){
                if(!this.professors.includes(p)) this.professors.push(p);
              }
            });
          }
        });
      });
    }
    this.profToSub = [];
    this.professors.forEach(p => {
      let subs:string[] = [];
      this.subjects.forEach(s => {
        this.teaches.forEach(t => {
          if(t.idprofessor==p.userid && t.idsubject==s.idsubject) subs.push(s.name);
        });
      });
      this.profToSub.push(subs);
    });
  }
  searchSubjects(){

  }

  sortByName(){
    if(this.namesAsc){
      this.professors.sort((p1, p2) => {
        const name1 = p1.name.toLowerCase() + p1.surname.toLowerCase();
        const name2 = p2.name.toLowerCase() + p2.surname.toLowerCase();
      
        if (name1 < name2) {
          return -1;
        } else if (name1 > name2) {
          return 1;
        } else {
          return 0;
        }
      });
      this.namesAsc = false;
    }
    else{
      this.professors.sort((p1, p2) => {
        const name1 = p1.name.toLowerCase() + p1.surname.toLowerCase();
        const name2 = p2.name.toLowerCase() + p2.surname.toLowerCase();
      
        if (name1 < name2) {
          return 1;
        } else if (name1 > name2) {
          return -1;
        } else {
          return 0;
        }
      });
      this.namesAsc = true;
    }
    this.profToSub = [];
      this.professors.forEach(p => {
        let subs:string[] = [];
        this.subjects.forEach(s => {
          this.teaches.forEach(t => {
            if(t.idprofessor==p.userid && t.idsubject==s.idsubject) subs.push(s.name);
          });
        });
        this.profToSub.push(subs);
      });
  }
  sortBySubjects(){
    if(this.subjectsAsc){
      this.professors.sort((p1, p2) => {
        const name1 = this.profToSub[this.professors.indexOf(p1)].join("").toLowerCase();
        const name2 = this.profToSub[this.professors.indexOf(p2)].join("").toLowerCase();
      
        if (name1 < name2) {
          return -1;
        } else if (name1 > name2) {
          return 1;
        } else {
          return 0;
        }
      });
      this.subjectsAsc = false;
    }
    else{
      this.professors.sort((p1, p2) => {
        const name1 = this.profToSub[this.professors.indexOf(p1)].join("").toLowerCase();
        const name2 = this.profToSub[this.professors.indexOf(p2)].join("").toLowerCase();
      
        if (name1 < name2) {
          return 1;
        } else if (name1 > name2) {
          return -1;
        } else {
          return 0;
        }
      });
      this.subjectsAsc = true;
    }
    this.profToSub = [];
      this.professors.forEach(p => {
        let subs:string[] = [];
        this.subjects.forEach(s => {
          this.teaches.forEach(t => {
            if(t.idprofessor==p.userid && t.idsubject==s.idsubject) subs.push(s.name);
          });
        });
        this.profToSub.push(subs);
      });
  }

}
