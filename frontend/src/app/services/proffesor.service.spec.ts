import { TestBed } from '@angular/core/testing';

import { ProffesorService } from './proffesor.service';

describe('ProffesorService', () => {
  let service: ProffesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProffesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
