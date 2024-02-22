import { Component, OnInit } from '@angular/core';
import { Subject } from '../models/Subject';
import { SubjectServiceService } from '../services/subject-service.service';
import { RegisterProfessorServiceService } from '../services/register-professor-service.service';
import { User } from '../models/User';
import { Age } from '../models/Age';
import { AgeServiceService } from '../services/age-service.service';
import { WorksWith } from '../models/WorksWith';
import { Teaches } from '../models/Teaches';
import { Professor } from '../models/Professor';
import { SubjectRequest } from '../models/SubjectRequest';
import { Router } from '@angular/router';
import { CV } from '../models/CV';

@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent implements OnInit {
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
  cv:string = "";
  errorMessage:string = "";
  page:number = 0;
  image:string=null;
  somethingelse:boolean=false;
  newSubject:string="";
  subjects:Subject[] = [];
  ages:Age[] = [];
  aboutSite:string="";
  id:number;
  prof:Professor;

  constructor(private subjectService:SubjectServiceService, private registerProfessorService:RegisterProfessorServiceService, private ageService:AgeServiceService, private router:Router){}

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(data=>{
      this.subjects=data;
      this.ageService.getAllAges().subscribe(data1=>this.ages = data1);
    });
  }

  isSubjectChecked(id):boolean{
    const checkboxElement = document.getElementById("subject" + id) as HTMLInputElement;
    if (checkboxElement) {
      return checkboxElement.checked;
    }
    return false;
  }
  isAgeChecked(id):boolean{
    const checkboxElement = document.getElementById("age" + id) as HTMLInputElement;
    if (checkboxElement) {
      return checkboxElement.checked;
    }
    return false;
  }

  registerProfessor(){
    this.errorMessage="";
    this.registerProfessorService.createUser(new User(-1, this.email, this.password, this.name, this.surname, this.address, this.contact, this.question, this.answer, this.gender, 2, this.username, this.image)).subscribe(data=>{
      if(data==-1){
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
      else this.id=data;
      this.prof = new Professor(this.id, this.email, this.password, this.name, this.surname, this.address, this.contact, this.question, this.answer, this.gender, 2, this.aboutSite, this.username, this.image, false);
      this.registerProfessorService.createProfessor(this.prof).subscribe(data1=>{
        if(data1==-1){
          alert("Greska");
          return;
        }
        this.subjects.forEach(s => {
          if(this.isSubjectChecked(s.idsubject)){
            this.subjectService.createTeaches(new Teaches(this.id, s.idsubject)).subscribe();
          }
        });
        this.ages.forEach(a=>{
          if(this.isAgeChecked(a.idage)){
            this.ageService.createWorksWith(new WorksWith(this.id, a.idage)).subscribe();
          }
        });
        if(this.cv!=null){
          let cv = new CV(this.id, this.cv);
          this.registerProfessorService.addCV(cv).subscribe(data=>{
           
          })
        }
        if(this.somethingelse){
          this.subjectService.createNewSubject(new SubjectRequest(-1, this.newSubject, this.id)).subscribe(data2=>{
            this.router.navigateByUrl("/");
          });
        }
        else{
          this.router.navigateByUrl("/");
        }
      });
    });

  }
  next(){
    this.errorMessage="";
    if(this.username=="" || this.password == "" || this.question == "" || this.answer=="" || this.name=="" || this.surname=="" || this.contact=="" || this.email=="" || this.address=="" || this.gender==-1){
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
    this.page++;
  }
  validateFile(event:Event){
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];  
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.result){
          this.cv = reader.result.toString().split(",")[1];
        }
      }
      reader.readAsDataURL(file);
    }
  }
  validateImg(event:Event){
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
              preview.innerHTML = `<img src="${img.src}" alt="Preview"><br/><br/>`;
              const reader = new FileReader();
              reader.onload = () => {
                if(reader.result){
                  this.image = reader.result.toString().split(",")[1];
                  console.log(this.image);
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
    else{
      this.image=null;
      preview.innerHTML="";
    }
  }
}
