import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { LocationService } from 'src/app/share/locations.service';
import {
  MessageType,
  NotificationService,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent {
  addressForm: FormGroup;
  makeSubmit: boolean = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  provinces: any;
  cantons: any;
  districts: any;

  idUser: number;
  userDefaultPhone: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    public formBuilder: FormBuilder,
    private gService: GenericService,
    private notification: NotificationService,
    private location: LocationService,
    private router: Router
  ) {
    this.reactiveForm();
    this.getProvinces();

    console.log(data);
    this.idUser = data.user.id;
    this.userDefaultPhone = data.user.phone;
  }

  reactiveForm() {
    this.addressForm = this.formBuilder.group({
      id_user: [null, null],
      province: [null, Validators.compose([Validators.required])],
      canton: [null, Validators.compose([Validators.required])],
      district: [null, Validators.compose([Validators.required])],
      direction: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      postal_code: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
        ]),
      ],
      phone: [
        null,
        Validators.compose([Validators.minLength(8), Validators.maxLength(8)]),
      ],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.addressForm.controls[control].hasError(error);
  };

  getProvinces() {
    this.location.getProvinces().subscribe((data: any) => {
      this.provinces = Object.entries(data).map(([id, name]) => ({ id, name }));
    });
  }

  getCantons(idProvince: string) {
    this.location.getCantons(idProvince).subscribe((data) => {
      this.cantons = Object.entries(data).map(([id, name]) => ({
        id,
        name,
        province_id: idProvince,
      }));
    });

    this.districts = [];
  }

  getDistricts(idProvince: string, idCanton: string) {
    this.location.getDistricts(idProvince, idCanton).subscribe((data) => {
      this.districts = Object.entries(data).map(([id, name]) => ({ id, name }));
    });
  }

  submitForm() {
    this.makeSubmit = true;

    this.addressForm.controls['id_user'].setValue(this.idUser);

    if (this.addressForm.invalid) return;

    if (this.addressForm.value.phone == null)
      this.addressForm.controls['phone'].setValue(this.userDefaultPhone);

    this.gService.create('address', this.addressForm.value).subscribe(
      (data: any) => {
        this.notification.message(
          'Success',
          'Address registered successfully',
          MessageType.success
        );
      },
      (error) => {
        this.notification.message(
          'Error',
          'An error happened',
          MessageType.error
        );
      }
    );
  }
}
