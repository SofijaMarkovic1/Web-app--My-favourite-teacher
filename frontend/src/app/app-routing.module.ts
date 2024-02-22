import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ProfessorProfilComponent } from './professor-profil/professor-profil.component';
import { ProfessorClassesComponent } from './professor-classes/professor-classes.component';
import { ProfessorStudentsComponent } from './professor-students/professor-students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminProfessorsComponent } from './admin-professors/admin-professors.component';
import { JoinClassComponent } from './join-class/join-class.component';
import { JoinClassProfessorComponent } from './join-class-professor/join-class-professor.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path: 'adminLogin', component: LoginAdminComponent},
  {path: 'registrationStudent', component: RegisterStudentComponent},
  {path: 'registrationProf', component: RegisterProfComponent},
  {path: 'changePassword', component:ChangePasswordComponent},
  {path: 'changePassword1', component:ChangePassword1Component},
  {path: 'guest', component:GuestComponent},
  {path: 'studentProfile', component:StudentProfilComponent},
  {path: 'studentProfs', component:StudentProfsComponent},
  {path:'studentClasses', component:StudentClassesComponent},
  {path: 'studentNotifications', component:StudentNotificationsComponent},
  {path: 'viewProfStudent', component:ViewProfStudentComponent},
  {path: 'professorProfile', component: ProfessorProfilComponent},
  {path: 'professorClasses', component: ProfessorClassesComponent},
  {path: 'professorStudents', component: ProfessorStudentsComponent},
  {path: 'studentDetails', component:StudentDetailsComponent},
  {path: 'adminHome', component:AdminHomeComponent},
  {path: 'adminStudents', component:AdminStudentsComponent},
  {path: 'adminProfessors', component:AdminProfessorsComponent},
  {path: 'joinClass', component:JoinClassComponent},
  {path: 'joinClassProfessor', component:JoinClassProfessorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
