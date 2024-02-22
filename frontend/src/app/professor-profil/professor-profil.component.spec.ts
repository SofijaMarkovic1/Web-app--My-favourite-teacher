import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorProfilComponent } from './professor-profil.component';

describe('ProfessorProfilComponent', () => {
  let component: ProfessorProfilComponent;
  let fixture: ComponentFixture<ProfessorProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorProfilComponent]
    });
    fixture = TestBed.createComponent(ProfessorProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
