import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServicesPackagesComponent } from './show-services-packages.component';

describe('ShowServicesPackagesComponent', () => {
  let component: ShowServicesPackagesComponent;
  let fixture: ComponentFixture<ShowServicesPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowServicesPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowServicesPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
