import { Component } from '@angular/core';
import { Student } from '../models/Student';
import { RegisterStudentServiceService } from '../services/register-student-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent {
  username:string;
  password:string;
  question:string;
  answer:string;
  name:string;
  surname:string;
  gender:number = -1;
  address:string;
  contact:string;
  email:string;
  schoolType:number = -1;
  grade:number = -1;
  image:string = "";
  errorMessage:string = "";
  student:Student;

  constructor(private registerStudentService:RegisterStudentServiceService, private router:Router){}

  registerStudent(){
    this.errorMessage = "";
    if(this.username=="" || this.password == "" || this.question == "" || this.answer=="" || this.name=="" || this.surname=="" || this.contact=="" || this.email=="" || this.address=="" || this.gender==-1 || this.schoolType==-1 || this.grade==-1){
      this.errorMessage="All fields are required.";
      return;
    }
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@#$%^&+=]).{6,10}$/;
    if (!(regex.test(this.password) && /^[a-zA-Z]/.test(this.password))){
      this.errorMessage = "Invalid password. Password must contain 6-10 characters, at least 1 capital, 3 small, 1 number, 1 special character and must start with a letter.";
      return;
    }
    const regex1 = /^\+\d{12}$/;
    if(!regex1.test(this.contact)){
      this.errorMessage = "Contact must be in +xxxxxxxxxxxx format.";
      return;
    }
    this.registerStudentService.registerStudent(this.username, this.password, this.question, this.answer, this.name, this.surname, this.gender, this.address, this.contact, this.email, this.schoolType, this.grade, this.image).subscribe(data=>{
      if(data==0){
        this.router.navigateByUrl("/");
        return;
      }
      else if(data==-1){
        this.errorMessage="This username is already taken.";
        return;
      }
      else if(data==-2){
        this.errorMessage="This email is already taken.";
        return;
      }
      else if(data==-4){
        this.errorMessage="This username is banned by admin.";
        return;
      }
      else if(data==-5){
        this.errorMessage="This email is banned by admin.";
        return;
      }
    });
  }
  validateFile(event:Event){
    const fileInput = event.target as HTMLInputElement;
    const preview = document.getElementById('preview');

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 300 * 300; // 300x300 pixels

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (allowedTypes.includes(file.type)) {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          if (img.width >= 100 && img.height >= 100 && img.width <= 300 && img.height <= 300 && file.size <= maxSize) {
              preview.innerHTML = `<img src="${img.src}" alt="Preview">`;
              const reader = new FileReader();
              reader.onload = () => {
                if(reader.result){
                  this.image = reader.result.toString().split(",")[1];
                }
              }
              reader.readAsDataURL(file);
          } else {
              this.errorMessage = "Image must between 100x100px (minimum) and 300x300px (maximum).";
              fileInput.value = ''; 
              preview.innerHTML = '';
            }
        };
      } else {
        this.errorMessage = "Image must be .jpg or .png";
        fileInput.value = '';
        preview.innerHTML = '';
      }
    }
  }
}
