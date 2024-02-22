import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinClassProfessorComponent } from './join-class-professor.component';

describe('JoinClassProfessorComponent', () => {
  let component: JoinClassProfessorComponent;
  let fixture: ComponentFixture<JoinClassProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinClassProfessorComponent]
    });
    fixture = TestBed.createComponent(JoinClassProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
