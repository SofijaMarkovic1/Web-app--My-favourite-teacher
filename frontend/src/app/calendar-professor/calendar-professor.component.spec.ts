import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarProfessorComponent } from './calendar-professor.component';

describe('CalendarProfessorComponent', () => {
  let component: CalendarProfessorComponent;
  let fixture: ComponentFixture<CalendarProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarProfessorComponent]
    });
    fixture = TestBed.createComponent(CalendarProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
