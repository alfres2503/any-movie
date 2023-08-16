import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { LocationService } from 'src/app/share/locations.service';
import {
  MessageType,
  NotificationService,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-p-method-form',
  templateUrl: './p-method-form.component.html',
  styleUrls: ['./p-method-form.component.css'],
})
export class PMethodFormComponent {
  methodForm: FormGroup;
  makeSubmit: boolean = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  idUser: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    public formBuilder: FormBuilder,
    private gService: GenericService,
    private notification: NotificationService,
    private location: LocationService,
    private dialogRef: MatDialogRef<PMethodFormComponent>
  ) {
    this.reactiveForm();
    console.log(data);
    this.idUser = data.user.id;
  }

  reactiveForm() {
    this.methodForm = this.formBuilder.group({
      id_user: [null, null],
      type: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      provider: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      account_number: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      expiration_date: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.methodForm.controls[control].hasError(error);
  };

  getNextMonthFirstDay() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextMonth;
  }

  submitForm() {
    this.makeSubmit = true;

    this.methodForm.controls['id_user'].setValue(this.idUser);

    if (this.methodForm.invalid) return;

    const expirationDate = new Date(this.methodForm.value.expiration_date);
    const formattedDate = `${expirationDate.getFullYear()}-${(
      expirationDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${expirationDate
      .getDate()
      .toString()
      .padStart(2, '0')}`;

    this.methodForm.controls['expiration_date'].setValue(formattedDate);

    this.gService.create('paymentMethods', this.methodForm.value).subscribe(
      (data: any) => {
        this.notification.message(
          'Success',
          'Payment method registered successfully',
          MessageType.success
        );
        this.dialogRef.close();
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
