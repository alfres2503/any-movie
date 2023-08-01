import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { AnswerFormComponent } from '../answer-form/answer-form.component';

@Component({
  selector: 'app-p-detail',
  templateUrl: './p-detail.component.html',
  styleUrls: ['./p-detail.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
})
export class PDetailComponent {
  data: any;
  comments: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  gridCols: number = 2;

  isAuth: boolean;
  currentUser: any;
  idUser: number;

  commentForm: FormGroup;
  productAnswer: any;

  id: number;

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();

    let id = this.route.snapshot.paramMap.get('id');
    this.id = +id;
    if (!isNaN(Number(this.id))) {
      this.getProduct(Number(this.id));
      this.getComments(Number(this.id));
    }
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAuth = valor)
    );

    this.idUser = this.authService.idUser;
  }

  ngOnInit(): void {}

  getProduct(id: any) {
    this.gService
      .get('products', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        console.log(apiData);
        this.data = apiData;
      });
  }

  reactiveForm() {
    this.commentForm = this.formBuilder.group({
      id: [null, null],
      id_product: [this.id, null],
      id_user: [this.idUser, null],
      text: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(191),
        ]),
      ],
    });
  }

  getComments(id: any) {
    this.gService
      .get('comments/product', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.comments = apiData;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  //toggle
  // --titles
  isDescriptionHidden: boolean = true;
  isRatingHidden: boolean = true;
  isSellerHidden: boolean = true;

  // --functions
  toggleDescription(): void {
    this.isDescriptionHidden = !this.isDescriptionHidden;
    this.isRatingHidden = true;
    this.isSellerHidden = true;
  }

  toggleRating(): void {
    this.isRatingHidden = !this.isRatingHidden;
    this.isSellerHidden = true;
    this.isDescriptionHidden = true;
  }

  toggleSeller(): void {
    this.isSellerHidden = !this.isSellerHidden;
    this.isDescriptionHidden = true;
    this.isRatingHidden = true;
  }

  //images
  selectedProductIndex = 0;

  changeIndex(index) {
    this.selectedProductIndex = index;
  }

  //form
  createComment() {
    if (
      this.commentForm.invalid ||
      this.commentForm.value.text.trim().length === 0
    )
      return;

    this.commentForm.value.id_product = this.id;
    this.commentForm.value.id_user = this.idUser;

    console.log(this.commentForm.value);

    //API create action, sending the complete info
    this.gService
      .create('comments', this.commentForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //get answer
        this.productAnswer = data;

        this.getComments(this.id);
        this.commentForm.reset();
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.commentForm.controls[control].hasError(error);
  };

  answerDialog(comment: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { comment: comment };
    dialogConfig.width = '90vw';

    this.dialog.open(AnswerFormComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe((data: any) => {
      this.getComments(this.id);
    });
  }
}
