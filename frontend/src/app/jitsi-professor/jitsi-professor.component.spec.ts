import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitsiProfessorComponent } from './jitsi-professor.component';

describe('JitsiProfessorComponent', () => {
  let component: JitsiProfessorComponent;
  let fixture: ComponentFixture<JitsiProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JitsiProfessorComponent]
    });
    fixture = TestBed.createComponent(JitsiProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
