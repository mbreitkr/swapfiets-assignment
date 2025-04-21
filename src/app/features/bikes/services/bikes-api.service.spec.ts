import { TestBed } from '@angular/core/testing';

import { BikesApiService } from './bikes-api.service';

describe('BikesApiService', () => {
  let service: BikesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
