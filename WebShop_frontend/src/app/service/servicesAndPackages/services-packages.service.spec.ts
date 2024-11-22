import { TestBed } from '@angular/core/testing';

import { ServicesPackagesService } from './services-packages.service';

describe('ServicesPackagesService', () => {
  let service: ServicesPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
