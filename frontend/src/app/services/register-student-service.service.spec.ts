import { TestBed } from '@angular/core/testing';

import { RegisterStudentServiceService } from './register-student-service.service';

describe('RegisterStudentServiceService', () => {
  let service: RegisterStudentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterStudentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
