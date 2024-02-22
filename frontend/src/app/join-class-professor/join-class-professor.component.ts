import { Component, OnInit } from '@angular/core';
import { Class } from '../models/Class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-class-professor',
  templateUrl: './join-class-professor.component.html',
  styleUrls: ['./join-class-professor.component.css']
})
export class JoinClassProfessorComponent implements OnInit {
  class:Class;

  constructor(private router:Router) {}
  ngOnInit(): void {
    let c = localStorage.getItem("class");
    if(c==null) return;
    this.class = JSON.parse(c);
  }

  endClass(){
        localStorage.removeItem("class");
        this.router.navigateByUrl("/professorClasses");
  }
  logout(){
    localStorage.removeItem("professor");
    this.router.navigateByUrl("/");
  }
}
