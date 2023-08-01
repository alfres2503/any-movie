import { GenericService } from 'src/app/share/generic.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
})
export class AnswerFormComponent implements OnInit {
  dataDialog: any;
  answerForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  apiAnswer: any;
  idUser: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AnswerFormComponent>,
    private gService: GenericService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.dataDialog = data;
    this.reactiveForm();
    this.idUser = this.authService.idUser;
  }

  ngOnInit(): void {
    console.log(this.dataDialog);
  }

  reactiveForm() {
    this.answerForm = this.formBuilder.group({
      id: [null, null],
      id_comment: [this.dataDialog.comment.id, null],
      id_user: [null, null],
      text: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.answerForm.controls[control].hasError(error);
  };

  createAnswer() {
    this.answerForm.value.id_comment = this.dataDialog.comment.id;
    this.answerForm.value.id_user = this.idUser;

    if (
      this.answerForm.value.text == null ||
      this.answerForm.invalid ||
      this.answerForm.value.text.trim().length === 0
    ) {
      return;
    }

    this.gService
      .create('answers', this.answerForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //get answer
        this.apiAnswer = data;

        // this.router
        //   .navigateByUrl('/', { skipLocationChange: true })
        //   .then(() => {
        //     this.router.navigate([
        //       '/products/' + this.dataDialog.comment.id_product,
        //     ]);
        //   });
        this.dialogRef.close();
      });
  }
}
