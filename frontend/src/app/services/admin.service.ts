import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/Subject';
import { Professor } from '../models/Professor';
import { Teaches } from '../models/Teaches';
import { NewSubject } from '../models/NewSubject';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client:HttpClient) { }

  profesorToAge(){
    return this.client.get<number[]>("http://localhost:8080/admin/profToAge");
  }
  profToSubject(){
    return this.client.get<number[]>("http://localhost:8080/admin/profToSubject");
  }
  getSubjectNames(){
    return this.client.get<string[]>("http://localhost:8080/admin/subjectNames");
  }
  getProfGender(){
    return this.client.get<number[]>("http://localhost:8080/admin/profGender");
  }
  getStudGender(){
    return this.client.get<number[]>("http://localhost:8080/admin/studGender");
  }
  classesPerDayOfWeek(){
    return this.client.get<number[]>("http://localhost:8080/admin/classesPerDayOfWeek");
  }
  tenBestProfs(){
    return this.client.get<string[]>("http://localhost:8080/admin/10professors");
  }
  classesPerMonth(n:string){
    return this.client.get<number[]>("http://localhost:8080/admin/classesPerMonth?name=" + n);
  }
  classesPerSubject(){
    return this.client.get<number[]>("http://localhost:8080/admin/classesPerSubject");
  }
  classesPerProf(){
    return this.client.get<number[]>("http://localhost:8080/admin/classesPerProf");
  }
  getAllProfessors(){
    return this.client.get<Professor[]>("http://localhost:8080/admin/allProfs");
  }

  deactivateProfessor(id:number){
    return this.client.post("http://localhost:8080/admin/deactivateProf", id);
  }
  activateProfessor(id:number){
    return this.client.post("http://localhost:8080/admin/activateProf", id);
  }
  declineProfessor(id:number){
    return this.client.post("http://localhost:8080/admin/declineProf", id);
  }

  addSubject(n:string){
    return this.client.post<Subject>("http://localhost:8080/admin/addSubject", n);
  }
  addTeaches(t:Teaches){
    return this.client.post("http://localhost:8080/admin/addTeaches", t);
  }
  getNewSubjects(){
    return this.client.get<NewSubject[]>("http://localhost:8080/admin/newSubjects");
  }

  deleteNewSubject(ns:NewSubject){
    return this.client.post("http://localhost:8080/admin/deleteNewSubject", ns);
  }

}
