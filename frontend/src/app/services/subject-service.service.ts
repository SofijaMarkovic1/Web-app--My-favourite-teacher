import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/Subject';
import { SubjectRequest } from '../models/SubjectRequest';
import { Teaches } from '../models/Teaches';

@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {

  constructor(private httpClient:HttpClient) { }

  getAllSubjects(){
    return this.httpClient.get<Subject[]>("http://localhost:8080/subject");
  }

  createNewSubject(s:SubjectRequest){
    return this.httpClient.post<number>("http://localhost:8080/subject/new", s);
  }

  createTeaches(t:Teaches){
    return this.httpClient.post("http://localhost:8080/subject/newTeaches", t);
  }
}
