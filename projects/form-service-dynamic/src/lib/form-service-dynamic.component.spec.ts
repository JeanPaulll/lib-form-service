import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormServiceDynamicComponent } from './form-service-dynamic.component';

describe('FormServiceDynamicComponent', () => {
  let component: FormServiceDynamicComponent;
  let fixture: ComponentFixture<FormServiceDynamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormServiceDynamicComponent]
    });
    fixture = TestBed.createComponent(FormServiceDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
