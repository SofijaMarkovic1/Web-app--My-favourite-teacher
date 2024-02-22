import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PastClass } from '../models/PastClass';
import { Class } from '../models/Class';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private client:HttpClient) { }

  getPastClasses(idStudent:number){
    return this.client.get<PastClass[]>("http://localhost:8080/class/pastClasses?idStudent=" + idStudent);
  }

  getClasses(idStudent:number){
    return this.client.get<Class[]>("http://localhost:8080/class/incomingClasses?idStudent=" + idStudent);
  }
  getClassesIn15min(idStudent:number){
    return this.client.get<Class[]>("http://localhost:8080/class/in15mins?idStudent=" + idStudent);
  }
  getClassesIn15minProf(idStudent:number){
    return this.client.get<Class[]>("http://localhost:8080/class/in15minsProf?idStudent=" + idStudent);
  }

  rateProf(ps:PastClass){
    return this.client.post("http://localhost:8080/class/pastClasses/rateProf", ps);
  }
  leaveAComment(ps:PastClass){
    return this.client.post("http://localhost:8080/class/pastClasses/comment", ps);
  }

  rateStud(ps:PastClass){
    return this.client.post("http://localhost:8080/class/pastClasses/rateStud", ps);
  }
  leaveACommentProf(ps:PastClass){
    return this.client.post("http://localhost:8080/class/pastClasses/commentProf", ps);
  }

  numOfClasses(){
    return this.client.get<number[]>("http://localhost:8080/class/last7last31days");
  }

  getProfessorsIncomingClasses(id:number){
    return this.client.get<Class[]>("http://localhost:8080/class/incomingClassesProf?idStudent=" + id);
  }

  getRequests(id:number){
    return this.client.get<Class[]>("http://localhost:8080/class/requests?idStudent=" + id);
  }
  getIn4Hours(id:number){
    return this.client.get<Class[]>("http://localhost:8080/class/in4hrs?idStudent=" + id);
  }

  cancelClass(c:Class){
    return this.client.post("http://localhost:8080/class/cancel", c);
  }
  declineClass(c:Class){
    return this.client.post("http://localhost:8080/class/decline", c);
  }
  acceptClass(c:Class){
    return this.client.post("http://localhost:8080/class/accept", c);
  }

  createNotif(n:Notification){
    alert('tu sam1');
    return this.client.post("http://localhost:8080/notification/create", n);
  }

  getPastClassesForStudentAndProf(s:number, p:number){
    return this.client.get<PastClass[]>("http://localhost:8080/class/pastClassesForStudentAndProf?idp=" + p + "&ids=" + s);
  }

  deleteClass(c:Class){
    return this.client.post("http://localhost:8080/class/deleteClass", c); 
  }

  insertPastClass(p:PastClass){
    return this.client.post("http://localhost:8080/class/insertPastClass", p); 
  }
}
