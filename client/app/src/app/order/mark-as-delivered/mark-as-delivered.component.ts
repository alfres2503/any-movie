import { NotificationService } from './../../share/notification.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mark-as-delivered',
  templateUrl: './mark-as-delivered.component.html',
  styleUrls: ['./mark-as-delivered.component.css'],
})
export class MarkAsDeliveredComponent {
  deliveryForm: FormGroup;
  makeSubmit: boolean = false;

  dataDialog: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
  ratingArr = [];

  @Input('rating') private rating: number = null;
  @Input('starCount') private starCount: number = 5;

  idUser: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<MarkAsDeliveredComponent>,
    private gService: GenericService,
    private formBuilder: FormBuilder
  ) {
    this.dataDialog = data;
    this.reactiveForm();
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  clickStar(rating: number) {
    this.rating = rating;
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  reactiveForm() {
    this.deliveryForm = this.formBuilder.group({
      arrivalDate: [null, Validators.compose([Validators.required])],
      seller_rating: [null, null],
      seller_feedback: [null, null],
    });
  }

  submitForm() {
    this.deliveryForm.value.seller_rating = this.rating;
    this.deliveryForm.value.id = this.dataDialog.id;

    console.log(this.deliveryForm.value);

    this.makeSubmit = true;

    if (
      this.deliveryForm.invalid ||
      this.deliveryForm.value.seller_feedback.trim().length === 0
    ) {
      return;
    }

    this.gService
      .update('transactions', this.deliveryForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.dialogRef.close();
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.deliveryForm.controls[control].hasError(error);
  };
}
