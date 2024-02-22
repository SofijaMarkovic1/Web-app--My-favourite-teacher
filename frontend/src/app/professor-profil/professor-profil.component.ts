import { Component, OnInit  } from '@angular/core';
import { Professor } from '../models/Professor';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { ProffesorService } from '../services/proffesor.service';
import { StudentService } from '../services/student.service';
import { WorksWith } from '../models/WorksWith';
import { Subject } from '../models/Subject';
import { SubjectServiceService } from '../services/subject-service.service';
import { Teaches } from '../models/Teaches';

@Component({
  selector: 'app-professor-profil',
  templateUrl: './professor-profil.component.html',
  styleUrls: ['./professor-profil.component.css']
})
export class ProfessorProfilComponent implements OnInit {
  professor:Professor;
  errorMessage:string="";
  avg:number;
  worksWith:string="";
  newName:string="";
  newSurname:string="";
  newAddress:string="";
  newContact:string="";
  newEmail:string="";
  newWorksWith:number;
  newImage:string="";
  subjects:Subject[] = [];
  allSubjects:Subject[] = [];
  primary1:boolean = false;
  primary2:boolean = false;
  highschool:boolean = false;
  isSubjectChosen:boolean[] = [];

  constructor(private router:Router, private proffesorService:ProffesorService, private studentService:StudentService, private subjectService:SubjectServiceService){}
  ngOnInit(): void {
      this.primary1 = false;
      this.primary2 = false;
      this.highschool = false;
      let p = localStorage.getItem("professor");
      if(p==null) return;
      this.professor = JSON.parse(p);
      this.proffesorService.averageGrade(this.professor.userid).subscribe(data1=>{
        this.avg = data1;
        this.proffesorService.worksWith(this.professor.userid).subscribe(data=>{
          this.worksWith = data.join(", ");
          if(data.includes("1-4")) this.primary1 = true;
          if(data.includes("5-8")) this.primary2 = true;
          if(data.includes("highschoolers")) this.highschool = true;
          this.proffesorService.getSubjectsForProfessor(this.professor.userid).subscribe(data2=>{
            this.subjects = data2;
            this.subjectService.getAllSubjects().subscribe(data3=>{
              this.allSubjects = data3;
              this.allSubjects.forEach(sub => {
                let flag=false;
                this.subjects.forEach(s => {
                  if(s.idsubject == sub.idsubject) flag = true;
                });
                if(flag) this.isSubjectChosen.push(true);
                else this.isSubjectChosen.push(false);
              });
            })
        });
      });
    })
  }


  logout(){
    localStorage.removeItem("professor");
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
          if(this.newName!=this.professor.name && this.newName!="") this.professor.name=this.newName;
          if(this.newSurname!=this.professor.surname && this.newSurname!="") this.professor.surname=this.newSurname;
          if(this.newContact!=this.professor.contact && this.newContact!="") this.professor.contact=this.newContact;
          if(this.newAddress!=this.professor.adress && this.newAddress!="") this.professor.adress=this.newAddress;
          if(this.newEmail!=this.professor.email && this.newEmail!="") this.professor.email = this.newEmail;
          if(this.newImage!=this.professor.image && this.newImage!="") this.professor.image = this.newImage;
          
        //update podataka
        console.log(this.primary1 + " " + this.primary2 + " " + this.highschool);
        this.proffesorService.edit(this.professor).subscribe(data=>{
          localStorage.setItem("professor", JSON.stringify(this.professor));
          if(this.primary1==true){
            this.proffesorService.insertWorksWith(new WorksWith(this.professor.userid, 1)).subscribe();
          }
          if(this.primary2==true){
            this.proffesorService.insertWorksWith(new WorksWith(this.professor.userid, 2)).subscribe();
          }
          if(this.highschool==true){
            this.proffesorService.insertWorksWith(new WorksWith(this.professor.userid, 3)).subscribe();
          }
          for(let i=0; i<this.isSubjectChosen.length;i++){
            if(this.isSubjectChosen[i]){
              let flag=false;
              this.subjects.forEach(s => {
                if(s.idsubject == this.allSubjects[i].idsubject) flag = true;
              });
              if(!flag){
                this.subjectService.createTeaches(new Teaches(this.professor.userid, this.allSubjects[i].idsubject)).subscribe();
              }
            }
          }
          this.ngOnInit();
        })
      }
      })
    }
    else{
          if(this.newName!=this.professor.name && this.newName!="") this.professor.name=this.newName;
          if(this.newSurname!=this.professor.surname && this.newSurname!="") this.professor.surname=this.newSurname;
          if(this.newContact!=this.professor.contact && this.newContact!="") this.professor.contact=this.newContact;
          if(this.newAddress!=this.professor.adress && this.newAddress!="") this.professor.adress=this.newAddress;
          if(this.newEmail!=this.professor.email && this.newEmail!="") this.professor.email = this.newEmail;
          if(this.newImage!=this.professor.image && this.newImage!="") this.professor.image = this.newImage;
          

        //update podataka
        console.log(this.primary1 + " " + this.primary2 + " " + this.highschool);
        this.proffesorService.edit(this.professor).subscribe(data=>{
          localStorage.setItem("professor", JSON.stringify(this.professor));
          if(this.primary1==true){
            this.proffesorService.insertWorksWith(new WorksWith(this.professor.userid, 1)).subscribe();
          }
          if(this.primary2==true){
            this.proffesorService.insertWorksWith(new WorksWith(this.professor.userid, 2)).subscribe();
          }
          if(this.highschool==true){
            this.proffesorService.insertWorksWith(new WorksWith(this.professor.userid, 3)).subscribe();
          }
          for(let i=0; i<this.isSubjectChosen.length;i++){
            if(this.isSubjectChosen[i]){
              let flag=false;
              this.subjects.forEach(s => {
                if(s.idsubject == this.allSubjects[i].idsubject) flag = true;
              });
              if(!flag){
                this.subjectService.createTeaches(new Teaches(this.professor.userid, this.allSubjects[i].idsubject)).subscribe();
              }
            }
          }

          this.ngOnInit();
        })
    }
  }
}
