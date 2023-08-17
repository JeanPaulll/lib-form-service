import { TestBed } from '@angular/core/testing';

import { FormServiceDynamic } from './form-service-dynamic.service';

describe('FormServiceDynamicService', () => {
  let service: FormServiceDynamic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormServiceDynamic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
