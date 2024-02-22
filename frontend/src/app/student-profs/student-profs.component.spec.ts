import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfsComponent } from './student-profs.component';

describe('StudentProfsComponent', () => {
  let component: StudentProfsComponent;
  let fixture: ComponentFixture<StudentProfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProfsComponent]
    });
    fixture = TestBed.createComponent(StudentProfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
