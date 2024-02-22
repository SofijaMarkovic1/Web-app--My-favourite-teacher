import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/Subject';
import { Class } from '../models/Class';
import { Professor } from '../models/Professor';
import { WorksWith } from '../models/WorksWith';
import { WorkingHours } from '../models/WorkingHours';

@Injectable({
  providedIn: 'root'
})
export class ProffesorService {

  constructor(private client:HttpClient) { }

  worksWith(id:number){
    return this.client.get<string[]>("http://localhost:8080/professor/getWorksWith?id=" + id);
  }

  getSubjectsForProfessor(id:number){
    return this.client.get<Subject[]>("http://localhost:8080/professor/subjects?id=" + id);
  }

  isProfessorFree(id:number, d:string, b:boolean){
    return this.client.get<number>("http://localhost:8080/class/professorAvailable?id=" + id + "&date=" + d + "&d=" + b);
  }

  insertClass(c:Class){
    return this.client.post<number>("http://localhost:8080/class/add", c);
  }

  averageGrade(id:number){
    return this.client.get<number>("http://localhost:8080/professor/average?id=" + id);
  }

  comments(id:number){
    return this.client.get<string[]>("http://localhost:8080/professor/comments?id=" + id);
  }

  edit(p:Professor){
    return this.client.post("http://localhost:8080/professor/edit", p);
  }

  insertWorksWith(w:WorksWith){
    return this.client.post("http://localhost:8080/professor/insertWorksWith", w);
  }

  insertWorkingHours(w:WorkingHours){
    return this.client.post<number>("http://localhost:8080/professor/insertWorkingHours", w);
  }

  getWorkingHoursForProf(id:number){
    return this.client.get<WorkingHours[]>("http://localhost:8080/professor/getWorkingHoursForProf?id=" + id);
  }

  insertGroupClass(c:Class){
    return this.client.post<number>("http://localhost:8080/class/addGroup", c);
  }
  getGroupClasses(id:number){
    return this.client.get<Class[]>("http://localhost:8080/class/groupClasses?idProf=" + id);
  }
}
