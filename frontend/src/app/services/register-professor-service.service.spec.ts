import { TestBed } from '@angular/core/testing';

import { RegisterProfessorServiceService } from './register-professor-service.service';

describe('RegisterProfessorServiceService', () => {
  let service: RegisterProfessorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterProfessorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
