import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Professor } from '../models/Professor';
import { ClassService } from '../services/class.service';
import { Class } from '../models/Class';
import { ProffesorService } from '../services/proffesor.service';
import { WorkingHours } from '../models/WorkingHours';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-calendar-professor',
  templateUrl: './calendar-professor.component.html',
  styleUrls: ['./calendar-professor.component.css']
})
export class CalendarProfessorComponent implements OnInit {
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
    firstDay: 1
  };

  professor:Professor;
  incoming:Class[] = [];
  requests:Class[] = [];
  workingHours:WorkingHours[] = [];
  events: EventInput[] = [];
  message:string = "";

  constructor(private classService:ClassService, private professorService:ProffesorService){}

  ngOnInit(): void {
    let p = localStorage.getItem("professor");
    if(p==null) return;
    this.professor = JSON.parse(p);
    this.classService.getProfessorsIncomingClasses(this.professor.userid).subscribe(data=>{
      this.incoming = data;
      this.incoming.forEach(c => {
        this.events.push({
          title: 'Your class',
          start: c.dateAndTimeStart.split(" ").join("T"),
          end: c.dateAndTimeEnd.split(" ").join("T"),
          color: 'rgb(27, 89, 30)'
        });
      });
      this.classService.getRequests(this.professor.userid).subscribe(data1=>{
        this.requests = data1;
        this.requests.forEach(req => {
          let title="Class request";
          this.events.push({
            title: title,
            start: req.dateAndTimeStart.split(" ").join("T"),
            end: req.dateAndTimeEnd.split(" ").join("T"),
            color: 'rgb(247, 221, 69)'
          });
        });
        this.professorService.getWorkingHoursForProf(this.professor.userid).subscribe(data2=>{
          console.log(data2);
          this.workingHours = data2;
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
          this.calendarOptions.events = this.events;
        })
      })
    })
  }

  openEventModal(m:string) {
    this.message=m;
    // Otvorite modal koristeći Bootstrap JavaScript API
    const modalElement = document.getElementById('editProfileModal1');
    const modal = new bootstrap.Modal(modalElement, { centered: true });
  
  // Prikazivanje moda
    modal.show();
  }

  handleEventClick(arg: EventClickArg) {
    this.openEventModal(arg.event._def.title);
  }

}
