import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private client:HttpClient) { }

  getNotifications(id:number){
    return this.client.get<Notification[]>("http://localhost:8080/notification?id=" + id);
  }

  markAsSeen(id:number){
    return this.client.post("http://localhost:8080/notification/seen", id);
  }
}
