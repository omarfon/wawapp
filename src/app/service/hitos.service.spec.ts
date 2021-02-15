import { TestBed } from '@angular/core/testing';

import { HitosService } from './hitos.service';

describe('HitosService', () => {
  let service: HitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
