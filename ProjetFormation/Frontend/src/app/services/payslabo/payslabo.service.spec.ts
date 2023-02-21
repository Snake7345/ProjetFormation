import { TestBed } from '@angular/core/testing';

import { PayslaboService } from './payslabo.service';

describe('PayslaboService', () => {
  let service: PayslaboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayslaboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
