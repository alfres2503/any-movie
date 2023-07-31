import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UDetailComponent } from './u-detail.component';

describe('UDetailComponent', () => {
  let component: UDetailComponent;
  let fixture: ComponentFixture<UDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UDetailComponent]
    });
    fixture = TestBed.createComponent(UDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
