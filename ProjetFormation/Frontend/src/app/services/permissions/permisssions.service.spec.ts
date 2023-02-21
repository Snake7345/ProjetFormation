import { TestBed } from '@angular/core/testing';

import { PermisssionsService } from './permisssions.service';

describe('PermisssionsService', () => {
  let service: PermisssionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisssionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
