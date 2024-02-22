import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/Professor';
import { Subject } from '../models/Subject';
import { Teaches } from '../models/Teaches';

@Injectable({
  providedIn: 'root'
})
export class GuestServiceService {

  constructor(private client:HttpClient) { }

  getStudentCnt(){
    return this.client.get<number>("http://localhost:8080/student/cnt");
  }

  getProfessorCnt(){
    return this.client.get<number>("http://localhost:8080/professor/cnt");
  }

  getAllProfessors(){
    return this.client.get<Professor[]>("http://localhost:8080/professor");
  }

  getAllSubjects(){
    return this.client.get<Subject[]>("http://localhost:8080/subject");
  }
  getAllTeaches(){
    return this.client.get<Teaches[]>("http://localhost:8080/subject/getAllTeaches");
  }
}
