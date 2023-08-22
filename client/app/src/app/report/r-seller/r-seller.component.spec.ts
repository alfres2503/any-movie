import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSellerComponent } from './r-seller.component';

describe('RSellerComponent', () => {
  let component: RSellerComponent;
  let fixture: ComponentFixture<RSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RSellerComponent]
    });
    fixture = TestBed.createComponent(RSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
