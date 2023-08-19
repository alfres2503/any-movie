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
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.css'],
})
export class SubmitReviewComponent {
  reviewForm: FormGroup;
  makeSubmit: boolean = false;

  dataDialog: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
  ratingArr = [];

  @Input('rating') private rating: number = null;
  @Input('starCount') private starCount: number = 5;

  idUser: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<SubmitReviewComponent>,
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
    this.reviewForm = this.formBuilder.group({
      client_rating: [null, null],
      client_feedback: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(191),
        ]),
      ],
    });
  }

  submitForm() {
    this.reviewForm.value.client_rating = this.rating;
    this.reviewForm.value.id = this.dataDialog.id;

    console.log(this.reviewForm.value);

    this.makeSubmit = true;

    if (
      this.reviewForm.invalid ||
      this.reviewForm.value.client_feedback.trim().length === 0
    ) {
      console.log('invalid');
      return;
    }

    this.gService
      .update('transactions/review', this.reviewForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.dialogRef.close();
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.reviewForm.controls[control].hasError(error);
  };
}
