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

  commentForm: FormGroup;
  productAnswer: any;

  id: number;

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,   
    private router: Router,
  ) {
    this.reactiveForm(); 

    let id = this.route.snapshot.paramMap.get('id');
    this.id = +id
    if (!isNaN(Number(this.id))) {
      this.getProduct(Number(this.id));
      this.getComments(Number(this.id));
      
    }
    console.log(this.id)
  }

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
      id_user: [118310145, null],
      text: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  getComments(id: any) {
    this.gService
      .get('comments/product', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        console.log(apiData);
        this.comments = apiData;
      });
  }

  getImageUrl(image) {
    let binary = '';
    const bytes = new Uint8Array(image);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Image = window.btoa(binary);
    const imageUrl = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
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
  createComment(){ 
    console.log(this.id)
    console.log(this.commentForm.value);

    //API create action, sending the complete info
    // this.gService
    //   .create('comments', this.commentForm.value)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data: any) => {
    //     //get answer
    //     this.productAnswer = data;
    //     this.router.navigate(['/products/'+ this.id], {
    //       queryParams: { create: 'true' },
    //     });
    //   });
  }

  public errorHandling = (control: string, error: string) => {
    return this.commentForm.controls[control].hasError(error);
  };
}
