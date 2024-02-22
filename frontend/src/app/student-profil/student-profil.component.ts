import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-profil',
  templateUrl: './student-profil.component.html',
  styleUrls: ['./student-profil.component.css']
})
export class StudentProfilComponent implements OnInit {

  student:Student;
  schoolType: string;
  errorMessage: string="";
  newName:string="";
  newSurname:string="";
  newAddress:string="";
  newEmail:string="";
  newContact:string="";
  newImage:string="";
  newGrade:number;

  constructor(private router:Router, private studentService:StudentService){}

  ngOnInit(): void {
    this.errorMessage="";
    this.newName="";
    this.newSurname="";
    this.newAddress="";
    this.newEmail="";
    this.newContact="";
    this.newImage="";
    let x = localStorage.getItem("student");
    if(x!=null){
      this.student = JSON.parse(x);
      switch (this.student.schoolType) {
        case 1:
          this.schoolType="Primary school";
          break;
        case 2:
          this.schoolType="Grammar school";
          break;
        case 3:
          this.schoolType="Vocational school";
          break;
        case 4:
          this.schoolType="Art school";
          break;
      
        default:
          break;
      }
      this.newGrade = this.student.grade;
    }
  }

  logout(){
    localStorage.removeItem("student");
    this.router.navigateByUrl("/");
  }
  
  openEditProfileModal() {
    this.errorMessage="";
    // Otvorite modal koristeći Bootstrap JavaScript API
    const modalElement = document.getElementById('editProfileModal');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
  
  // Prikazivanje moda
    modal.show();
  }

  save(){
    this.errorMessage="";
    const regex1 = /^\+\d{12}$/;
    if(this.newContact!="" && !regex1.test(this.newContact)){
      this.errorMessage = "Contact must be in +xxxxxxxxxxxx format.";
      return;
    }
    if(this.newEmail!=""){
      //proverimo da neko nema taj mejl
      this.studentService.checkEmail(this.newEmail).subscribe(data=>{
        if(!data){
          this.errorMessage = "This email is already in use.";
          return;
        }
        else{
          if(this.newName!=this.student.name && this.newName!="") this.student.name=this.newName;
          if(this.newSurname!=this.student.surname && this.newSurname!="") this.student.surname=this.newSurname;
          if(this.newContact!=this.student.contact && this.newContact!="") this.student.contact=this.newContact;
          if(this.newAddress!=this.student.adress && this.newAddress!="") this.student.adress=this.newAddress;
          if(this.newEmail!=this.student.email && this.newEmail!="") this.student.email = this.newEmail;
          if(this.newImage!=this.student.image && this.newImage!="") this.student.image = this.newImage;
          if(this.newGrade!=this.student.grade){
            if(this.newGrade==9) {
              this.student.schoolType = 2;
              this.student.grade = 1;
            }
            else if(this.newGrade==10){
              this.student.schoolType = 3;
              this.student.grade = 1;
            }
            else if(this.newGrade==11){
              this.student.schoolType = 4;
              this.student.grade = 1;
            }
            else{
              this.student.grade = this.newGrade;
            }
          }

        //update podataka
        this.studentService.edit(this.student).subscribe(data=>{
          localStorage.setItem("student", JSON.stringify(this.student));
          this.ngOnInit();
        })
      }
      })
    }
    else{
      if(this.newName!=this.student.name && this.newName!="") this.student.name=this.newName;
          if(this.newSurname!=this.student.surname && this.newSurname!="") this.student.surname=this.newSurname;
          if(this.newContact!=this.student.contact && this.newContact!="") this.student.contact=this.newContact;
          if(this.newAddress!=this.student.adress && this.newAddress!="") this.student.adress=this.newAddress;
          if(this.newEmail!=this.student.email && this.newEmail!="") this.student.email = this.newEmail;
          if(this.newImage!=this.student.image && this.newImage!="") this.student.image = this.newImage;
          if(this.newGrade!=this.student.grade){
            if(this.newGrade==9) {
              this.student.schoolType = 2;
              this.student.grade = 1;
            }
            else if(this.newGrade==10){
              this.student.schoolType = 3;
              this.student.grade = 1;
            }
            else if(this.newGrade==11){
              this.student.schoolType = 4;
              this.student.grade = 1;
            }
            else{
              this.student.grade = this.newGrade;
            }
          }

        //update podataka
        this.studentService.edit(this.student).subscribe(data=>{
          localStorage.setItem("student", JSON.stringify(this.student));
          this.ngOnInit();
        })
    }
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
                  this.newImage = reader.result.toString().split(",")[1];
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
