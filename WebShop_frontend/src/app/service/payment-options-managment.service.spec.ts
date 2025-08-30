import { TestBed } from '@angular/core/testing';

import { PaymentOptionsManagmentService } from './payment-options-managment.service';

describe('PaymentOptionsManagmentService', () => {
  let service: PaymentOptionsManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentOptionsManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
