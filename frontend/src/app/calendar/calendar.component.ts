import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var createGoogleEvent:any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  
  constructor(private fb:FormBuilder) {}
  scheduleClassForm!: FormGroup;
  
  ngOnInit(): void {
    this.scheduleClassForm = this.fb.group({
      classTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  scheduleAClass(){
    const eventDetails = this.scheduleClassForm.value;
    console.log(eventDetails);
    
    createGoogleEvent(eventDetails);
  }

}
