import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { LocationService } from 'src/app/share/locations.service';
import {
  MessageType,
  NotificationService,
} from 'src/app/share/notification.service';
import { AddressFormComponent } from '../address-form/address-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { PMethodFormComponent } from '../p-method-form/p-method-form.component';

@Component({
  selector: 'app-u-edit',
  templateUrl: './u-edit.component.html',
  styleUrls: ['./u-edit.component.css'],
})
export class UEditComponent implements OnInit {
  userForm: FormGroup;
  makeSubmit: boolean = false;

  isAuth: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();
  idUser: number;

  userInfo: any;
  userImage: any;

  addressesColumns = [
    'province',
    'canton',
    'district',
    'direction',
    'postal_code',
    'phone',
  ];
  addresses = new MatTableDataSource<any>();

  paymentColumns = ['type', 'provider', 'account_number', 'expiration_date'];
  payment_methods = new MatTableDataSource<any>();

  isSeller: boolean = false;

  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private notification: NotificationService,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );

    this.idUser = this.authService.idUser;

    if (this.idUser != undefined) {
      this.gService
        .get('users', this.idUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((apiData: any) => {
          this.userInfo = apiData;

          this.userImage = this.userInfo.image;
          this.addresses = new MatTableDataSource(this.userInfo.address);
          this.payment_methods = new MatTableDataSource(
            this.userInfo.payment_methods
          );

          this.userForm.setValue({
            name: this.userInfo.name,
            phone: this.userInfo.phone,
            email: this.userInfo.email,
            image: this.userInfo.image,
          });
        });
    }

    this.reactiveForm();
  }
  ngOnInit(): void {}

  refreshUser() {
    this.gService
      .get('users', this.idUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.userInfo = apiData;

        this.userImage = this.userInfo.image;
        this.addresses = new MatTableDataSource(this.userInfo.address);
        this.payment_methods = new MatTableDataSource(
          this.userInfo.payment_methods
        );

        this.userForm.setValue({
          name: this.userInfo.name,
          phone: this.userInfo.phone,
          email: this.userInfo.email,
          image: this.userInfo.image,
        });
      });
  }

  reactiveForm() {
    this.userForm = this.fb.group({
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
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.email,
        ]),
      ],
      image: [null],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.userForm.controls[control].hasError(error) &&
      this.userForm.controls[control].invalid &&
      (this.makeSubmit || this.userForm.controls[control].touched)
    );
  };

  getImage(event): any {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg', 0.5);
          this.userImage = dataURL.split(',')[1];
        };
        img.src = reader.result as string;
      };
    }
  }

  addressDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { user: this.userInfo };
    dialogConfig.width = '90vw';

    this.dialog.open(AddressFormComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe((data: any) => {
      this.refreshUser();
    });
  }

  pMethodDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { user: this.userInfo };
    dialogConfig.width = '90vw';

    this.dialog.open(PMethodFormComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe((data: any) => {
      this.refreshUser();
    });
  }

  updateUser() {
    this.makeSubmit = true;

    if (this.userForm.invalid) return;

    // insert user id in form
    this.userForm.value.id = this.idUser;
    this.userForm.value.image = this.userImage;

    this.gService
      .update('users', this.userForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.notification.message(
            'Success',
            'Information updated successfully',
            MessageType.success
          );
          this.refreshUser();
        },
        (error) => {
          this.notification.message(
            'Error',
            'Error updating information',
            MessageType.error
          );
        }
      );
  }
}
