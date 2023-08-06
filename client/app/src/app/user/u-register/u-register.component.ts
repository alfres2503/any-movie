import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificationService,
  MessageType,
} from 'src/app/share/notification.service';
import { LocationService } from 'src/app/share/locations.service';

@Component({
  selector: 'app-u-register',
  templateUrl: './u-register.component.html',
  styleUrls: ['./u-register.component.css'],
})
export class URegisterComponent {
  signupForm: FormGroup;
  makeSubmit: boolean = false;
  titleForm: string;
  hide = true;

  provinces: any[] = [];
  cantons: any[] = [];
  districts: any[] = [];

  selectedProvince: string = '';
  selectedCanton: string = '';

  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {
    this.reactiveForm();
    this.titleForm = 'User Registration';
    this.loadProvincias()
  }
  
  reactiveForm() {
    this.signupForm = this.fb.group({
      id: [null, null],
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phone: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      password: ['', Validators.required],
      company_name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      province: ['', Validators.required],
      canton: ['', Validators.required],
      district: ['', Validators.required],
      direction: ['', Validators.required],
      postal_code: ['', Validators.required],
    });
  }

  async loadProvincias() {
    try {
      const data: any = await this.locationService.getProvinces();
      for (const key in data) {
        this.provinces.push({ id: key, name: data[key] });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async onProvinceChange() {
    this.cantons = [];
    this.districts = [];
    this.selectedCanton = '';
    this.selectedProvince = this.signupForm.value.province;

    if (this.selectedProvince) {
      try {
        const data: any = await this.locationService.getCantons(this.selectedProvince);
        for (const key in data) {
          this.cantons.push({ id: key, name: data[key] });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

  }

  async onCantonChange() {
    this.districts = [];
    this.selectedCanton = this.signupForm.value.canton;
    if (this.selectedProvince && this.selectedCanton) {
      try {
        const data: any = await this.locationService.getDistritos(this.selectedProvince, this.selectedCanton);
        for (const key in data) {
          this.districts.push({ id: key, name: data[key] });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.signupForm.controls[control].hasError(error) &&
      this.signupForm.controls[control].invalid &&
      (this.makeSubmit || this.signupForm.controls[control].touched)
    );
  };
}
