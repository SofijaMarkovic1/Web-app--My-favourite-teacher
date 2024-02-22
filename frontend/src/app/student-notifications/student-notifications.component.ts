import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import { NotificationsService } from '../services/notifications.service';
import { Notification } from '../models/Notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-notifications',
  templateUrl: './student-notifications.component.html',
  styleUrls: ['./student-notifications.component.css']
})
export class StudentNotificationsComponent implements OnInit {
  student:Student;
  notifications:Notification[] = [];

  constructor(private notificationsService:NotificationsService, private router:Router){}

  ngOnInit(): void {
      let s = localStorage.getItem("student");
      if(s==null) return;
      this.student = JSON.parse(s);
      this.notificationsService.getNotifications(this.student.userid).subscribe(data=>{
        this.notifications = data;
        this.notifications.reverse();
        this.notificationsService.markAsSeen(this.student.userid).subscribe();
      });
  }
  logout(){
    localStorage.removeItem("student");
    this.router.navigateByUrl("/");
  }

}
