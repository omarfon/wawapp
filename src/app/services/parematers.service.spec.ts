import { TestBed } from '@angular/core/testing';

import { ParematersService } from './parematers.service';

describe('ParematersService', () => {
  let service: ParematersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParematersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
