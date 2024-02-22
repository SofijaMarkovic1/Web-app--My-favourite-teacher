import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfStudentComponent } from './view-prof-student.component';

describe('ViewProfStudentComponent', () => {
  let component: ViewProfStudentComponent;
  let fixture: ComponentFixture<ViewProfStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfStudentComponent]
    });
    fixture = TestBed.createComponent(ViewProfStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
