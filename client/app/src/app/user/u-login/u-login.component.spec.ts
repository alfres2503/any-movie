import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ULoginComponent } from './u-login.component';

describe('ULoginComponent', () => {
  let component: ULoginComponent;
  let fixture: ComponentFixture<ULoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ULoginComponent]
    });
    fixture = TestBed.createComponent(ULoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
