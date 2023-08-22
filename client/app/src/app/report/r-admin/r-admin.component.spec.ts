import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RAdminComponent } from './r-admin.component';

describe('RAdminComponent', () => {
  let component: RAdminComponent;
  let fixture: ComponentFixture<RAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RAdminComponent]
    });
    fixture = TestBed.createComponent(RAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
