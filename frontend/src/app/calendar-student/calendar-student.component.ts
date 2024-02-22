import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Professor } from '../models/Professor';
import { Class } from '../models/Class';
import { ClassService } from '../services/class.service';
import { WorkingHours } from '../models/WorkingHours';
import { ProffesorService } from '../services/proffesor.service';
import { Student } from '../models/Student';
import * as bootstrap from 'bootstrap';
import { Subject } from '../models/Subject';


@Component({
  selector: 'app-calendar-student',
  templateUrl: './calendar-student.component.html',
  styleUrls: ['./calendar-student.component.css']
})
export class CalendarStudentComponent implements OnInit {
  errorMessage="";
  message="";
  student:Student;
  professor:Professor;
  incomingClassesProfessor:Class[] = [];
  requests:Class[] = [];
  workingHours:WorkingHours[] = [];
  events: EventInput[] = [];
  selectedSubject:number;
  selectedTimeStart="";
  selectedTimeEnd="";
  topic="";
  double=false;
  subjects:Subject[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek', // Podesite na 'timeGridWeek' za nedeljni prikaz sa satima
    plugins: [timeGridPlugin, interactionPlugin], // Dodajte timeGridPlugin
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // Dodajte ove opcije za prebacivanje između dnevnog i nedeljnog prikaza
    },
    events: [],
    slotMinTime: '07:00', // Postavljanje minimalnog vremena prikaza
    slotMaxTime: '23:59',
    firstDay: 1,
    dateClick: this.openScheduleClassModal.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(private classService:ClassService, private professorService:ProffesorService) {}
  ngOnInit(): void {
      let p=localStorage.getItem("savedProf");
      if(p==null) return;
      this.professor = JSON.parse(p);
      let s = localStorage.getItem("student");
      if(s==null) return;
      this.student = JSON.parse(s);
      this.classService.getProfessorsIncomingClasses(this.professor.userid).subscribe(data=>{
        this.incomingClassesProfessor = data;
        this.incomingClassesProfessor.forEach(c => {
          this.events.push({
            title: 'Professors class',
            start: c.dateAndTimeStart.split(" ").join("T"),
            end: c.dateAndTimeEnd.split(" ").join("T"),
            color: 'rgb(27, 89, 30)'
          });
        });
        this.professorService.getWorkingHoursForProf(this.professor.userid).subscribe(data1=>{
          this.workingHours = data1;
          this.workingHours.forEach(w => {
            if(w.startTime==null && w.endTime==null){
              let startTime:string = w.date, endTime:string = w.date;
              startTime = startTime + "T00:00:00";
              endTime = endTime + "T23:59:59";
              this.events.push({
                title: 'Changed working hours',
                start: startTime,
                end: endTime,
                color: 'rgb(89, 27, 27)'
              });
            }
            else{
              let startTime:string = w.date, endTime:string = w.date;
              startTime = startTime + "T00:00:00";
              endTime = endTime + "T" + w.startTime + ":00";
              this.events.push({
                title: 'Changed working hours',
                start: startTime,
                end: endTime,
                color: 'rgb(89, 27, 27)'
              });
              let startTime1:string = w.date, endTime1:string = w.date;
              startTime1 = startTime1 + "T" + w.endTime + ":00";
              endTime1 = endTime1 + "T" +"23:59:59";
              this.events.push({
                title: 'Changed working hours',
                start: startTime1,
                end: endTime1,
                color: 'rgb(89, 27, 27)'
              });
            }
          });
          this.classService.getRequests(this.professor.userid).subscribe(data2=>{
            this.requests = data2;
            this.requests.forEach(req => {
              let title=null;
              if(req.idstudent==this.student.userid) title = 'You already requested class.'
              else title = 'Other student requested class';
              this.events.push({
                title: title,
                start: req.dateAndTimeStart.split(" ").join("T"),
                end: req.dateAndTimeEnd.split(" ").join("T"),
                color: 'rgb(247, 221, 69)'
              });
            });
            this.professorService.getSubjectsForProfessor(this.professor.userid).subscribe(data3=>{
              this.subjects = data3;
              this.calendarOptions.events = this.events;
            })
          })
        })
      })
  }
  openScheduleClassModal(arg: DateClickArg) {
    this.selectedTimeStart = arg.date.toISOString();
    this.selectedTimeStart = this.selectedTimeStart.slice(0,this.selectedTimeStart.length-5).split("T").join(" ");
    let inputDate = arg.date;
    inputDate.setHours(inputDate.getHours()+1);
    this.selectedTimeStart = inputDate.toISOString().replace("T", " ").substring(0, 19);
    inputDate.setHours(inputDate.getHours() + 1);
    this.selectedTimeEnd = inputDate.toISOString().replace("T", " ").substring(0, 19);
    this.errorMessage="";
    this.message="";
    this.topic="";
    this.double = false;
    // Otvorite modal koristeći Bootstrap JavaScript API
    const modalElement = document.getElementById('editProfileModal');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
  
  // Prikazivanje moda
    modal.show();
  }
  openEventModal(m:string) {
    this.message=m;
    // Otvorite modal koristeći Bootstrap JavaScript API
    const modalElement = document.getElementById('editProfileModal1');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
  
  // Prikazivanje moda
    modal.show();
  }

  closeScheduleClassModal() {
    // Zatvorite modal koristeći Bootstrap JavaScript API
    const modalElement = document.getElementById('editProfileModal');
    const modal = bootstrap.Modal.getInstance(modalElement);

    // Provera da li modal postoji pre nego što pokušamo zatvoriti
    if (modal) {
        // Zatvaranje moda
        modal.hide();
    }
  }
  addHour(){
    if(this.double==true){
      let inputDate = new Date(this.selectedTimeStart);
      inputDate.setHours(inputDate.getHours() + 3);
      this.selectedTimeEnd = inputDate.toISOString().replace("T", " ").substring(0, 19);
    }
    else{
      let inputDate = new Date(this.selectedTimeStart);
      inputDate.setHours(inputDate.getHours() + 2);
      this.selectedTimeEnd = inputDate.toISOString().replace("T", " ").substring(0, 19);
    }
  }

  scheduleClass(){
    if(this.selectedSubject==undefined){
      this.errorMessage="You must select a subject.";
      return;
    }
    let inputDate1 = new Date(this.selectedTimeStart);
    let inputDate2 = new Date(this.selectedTimeEnd);
    if(inputDate1.getTime()<new Date().getTime()){
      this.errorMessage="You must select a date in future.";
      return;
    }
    this.selectedTimeStart = inputDate1.toISOString().split("T").join(" ");
    this.selectedTimeEnd = inputDate2.toISOString().split("T").join(" ");
    let timeStart = this.selectedTimeStart.split(" ")[1].slice(0, 5);
    let timeEnd = this.selectedTimeEnd.split(" ")[1].slice(0,5);
    if(inputDate1.getHours()<10 || inputDate1.getHours()>18 || inputDate2.getHours()<10 || inputDate2.getHours()>18 || inputDate1.getDay()==0 || inputDate1.getDay()==6){
      let flag = false;
      this.workingHours.forEach(w => {
        if(new Date(w.date).getDate() == inputDate1.getDate()){
          if(w.startTime!=null && w.endTime!=null){
            if(new Date(w.date + "T" + w.startTime + ":00").getTime()<= inputDate1.getTime() && 
             new Date(w.date + "T" + w.endTime + ":00").getTime() >= inputDate2.getTime()
            ){
              flag = true;
            }
          }
        }
      });
      if(flag==false){
        this.errorMessage="Professor works from 10:00:00 to 18:00:00 Monday to Friday by default.";
        return;
      }
    }
    
    const c:Class = new Class(-1, this.professor.userid, this.selectedSubject, this.student.userid, this.selectedTimeStart.split(" ").join("T").slice(0, -5), this.selectedTimeEnd.split(" ").join("T").slice(0, -5), false, this.topic);
    this.professorService.insertClass(c).subscribe(data=>{
      if(data==0){
        this.closeScheduleClassModal();
        this.ngOnInit();
      }
      else{
        this.errorMessage = "ERROR";
      }
    });
  }

  handleEventClick(arg: EventClickArg) {
    this.openEventModal(arg.event._def.title);
  }
}
