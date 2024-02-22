import { Component, OnInit } from '@angular/core';
import { Professor } from '../models/Professor';
import { GuestServiceService } from '../services/guest-service.service';
import { Student } from '../models/Student';
import { StudentService } from '../services/student.service';
import { ProffesorService } from '../services/proffesor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profs',
  templateUrl: './student-profs.component.html',
  styleUrls: ['./student-profs.component.css']
})
export class StudentProfsComponent implements OnInit {
  allProfessors:Professor[] = [];
  professors:Professor[] = [];
  input:string = "";
  s:Student;
  namesAsc:boolean=true;
  avgs:number[] = [];
  av:number[] = [];

  constructor(private studentService:StudentService, private professorService:ProffesorService, private router:Router){}

  ngOnInit(): void {
      let x = localStorage.getItem("student");
      if(x==null) return;
      this.s = JSON.parse(x);
      let age:number;
      if(this.s.schoolType==1 && this.s.grade<=4){
        age = 1;
      }
      else if(this.s.schoolType==1 && this.s.grade>4){
        age = 2;
      }
      else age=3;
      this.studentService.allProfessorsWithWorksWith(age).subscribe(data=>{
        this.allProfessors = data;
        this.professors = data;
        this.allProfessors.forEach(p => {
          this.professorService.averageGrade(p.userid).subscribe(data1=>{
            this.avgs.push(data1);
            this.av.push(data1);
          })
        });
      })
  }
  logout(){
    localStorage.removeItem("student");
    this.router.navigateByUrl("/");
  }


  sortByName(){
    for(let i=0;i<this.professors.length; i++){
      for(let j=0; j<this.professors.length; j++){
        if(this.namesAsc){
          if(this.professors[j].name.toLowerCase() + this.professors[j].surname.toLowerCase()<this.professors[i].name.toLowerCase() + this.professors[i].surname.toLowerCase()){
            let p = this.professors[i];
            this.professors[i] = this.professors[j];
            this.professors[j] = p;
            let a = this.av[i];
            this.av[i] = this.av[j];
            this.av[j] = a;
          }
        }
        else{
          if(this.professors[j].name.toLowerCase() + this.professors[j].surname.toLowerCase()>this.professors[i].name.toLowerCase() + this.professors[i].surname.toLowerCase()){
            let p = this.professors[i];
            this.professors[i] = this.professors[j];
            this.professors[j] = p;
            let a = this.av[i];
            this.av[i] = this.av[j];
            this.av[j] = a;
          }
        }
      }
    }
    if(this.namesAsc) this.namesAsc=false;
    else this.namesAsc = true;
  }

  searchProfessors(){
    if(this.input=="") {
      this.professors=this.allProfessors;
      this.av = this.avgs;
    }
    else{
      this.av = [];
      this.professors = [];
      this.allProfessors.forEach(p => {
        if(p.name.toLowerCase().includes(this.input.toLowerCase()) || p.surname.toLowerCase().includes(this.input.toLowerCase())) {
          this.professors.push(p);
          this.av.push(this.avgs[this.allProfessors.indexOf(p)]);
        }
      });
    }
  }

  saveProf(p:Professor){
    localStorage.setItem("savedProf", JSON.stringify(p));
  }
}
