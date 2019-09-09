import { TestBed } from '@angular/core/testing';

import { EstatService } from './estat.service';

describe('EstatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstatService = TestBed.get(EstatService);
    expect(service).toBeTruthy();
  });
});
