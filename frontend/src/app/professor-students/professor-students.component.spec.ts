import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorStudentsComponent } from './professor-students.component';

describe('ProfessorStudentsComponent', () => {
  let component: ProfessorStudentsComponent;
  let fixture: ComponentFixture<ProfessorStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorStudentsComponent]
    });
    fixture = TestBed.createComponent(ProfessorStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
