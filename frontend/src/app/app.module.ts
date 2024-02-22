import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterProfComponent } from './register-prof/register-prof.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePassword1Component } from './change-password1/change-password1.component';
import { GuestComponent } from './guest/guest.component';
import { StudentProfilComponent } from './student-profil/student-profil.component';
import { StudentProfsComponent } from './student-profs/student-profs.component';
import { StudentClassesComponent } from './student-classes/student-classes.component';
import { StudentNotificationsComponent } from './student-notifications/student-notifications.component';
import { ViewProfStudentComponent } from './view-prof-student/view-prof-student.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfessorProfilComponent } from './professor-profil/professor-profil.component';
import { ProfessorClassesComponent } from './professor-classes/professor-classes.component';
import { ProfessorStudentsComponent } from './professor-students/professor-students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminProfessorsComponent } from './admin-professors/admin-professors.component';
import { JoinClassComponent } from './join-class/join-class.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { JoinClassProfessorComponent } from './join-class-professor/join-class-professor.component';
import { JitsiProfessorComponent } from './jitsi-professor/jitsi-professor.component';
import { CalendarStudentComponent } from './calendar-student/calendar-student.component';
import { CalendarProfessorComponent } from './calendar-professor/calendar-professor.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
    RegisterStudentComponent,
    RegisterProfComponent,
    ChangePasswordComponent,
    ChangePassword1Component,
    GuestComponent,
    StudentProfilComponent,
    StudentProfsComponent,
    StudentClassesComponent,
    StudentNotificationsComponent,
    ViewProfStudentComponent,
    CalendarComponent,
    ProfessorProfilComponent,
    ProfessorClassesComponent,
    ProfessorStudentsComponent,
    StudentDetailsComponent,
    AdminHomeComponent,
    AdminStudentsComponent,
    AdminProfessorsComponent,
    JoinClassComponent,
    JitsiComponent,
    JoinClassProfessorComponent,
    JitsiProfessorComponent,
    CalendarStudentComponent,
    CalendarProfessorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
