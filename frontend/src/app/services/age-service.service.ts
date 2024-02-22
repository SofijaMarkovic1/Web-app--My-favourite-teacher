import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Age } from '../models/Age';
import { WorksWith } from '../models/WorksWith';

@Injectable({
  providedIn: 'root'
})
export class AgeServiceService {

  constructor(private httpClient:HttpClient) { }

  getAllAges(){
    return this.httpClient.get<Age[]>("http://localhost:8080/age");
  }

  createWorksWith(w:WorksWith){
    return this.httpClient.post("http://localhost:8080/age/newWorksWith", w);
  }

  getWorksWith(id:number){
    return this.httpClient.get<WorksWith[]>("http://localhost:8080/age/getWorksWith?id=" + id);
  }
}
