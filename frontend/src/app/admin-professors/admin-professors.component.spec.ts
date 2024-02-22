import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessorsComponent } from './admin-professors.component';

describe('AdminProfessorsComponent', () => {
  let component: AdminProfessorsComponent;
  let fixture: ComponentFixture<AdminProfessorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfessorsComponent]
    });
    fixture = TestBed.createComponent(AdminProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
