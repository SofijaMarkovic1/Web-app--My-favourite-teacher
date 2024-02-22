import { Component, OnInit } from '@angular/core';
import { Class } from '../models/Class';
import { Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import { PastClass } from '../models/PastClass';

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.component.html',
  styleUrls: ['./join-class.component.css']
})
export class JoinClassComponent implements OnInit {
  class:Class;

  constructor(private router:Router, private classService:ClassService) {}
  ngOnInit(): void {
    let c = localStorage.getItem("class");
    if(c==null) return;
    this.class = JSON.parse(c);
  }

  endClass(){
    let p:PastClass = new PastClass(-1, this.class.idstudent, this.class.idprofessor, this.class.idsubject, this.class.dateAndTimeStart, this.class.dateAndTimeEnd, null, null, 0, 0);
    this.classService.deleteClass(this.class).subscribe(data=>{
      this.classService.insertPastClass(p).subscribe(data1=>{
        localStorage.removeItem("class");
        this.router.navigateByUrl("/studentClasses");
      })
    })
  }
  logout(){
    localStorage.removeItem("student");
    this.router.navigateByUrl("/");
  }

}
