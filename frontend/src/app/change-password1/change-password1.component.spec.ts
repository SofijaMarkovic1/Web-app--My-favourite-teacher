import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassword1Component } from './change-password1.component';

describe('ChangePassword1Component', () => {
  let component: ChangePassword1Component;
  let fixture: ComponentFixture<ChangePassword1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassword1Component]
    });
    fixture = TestBed.createComponent(ChangePassword1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
