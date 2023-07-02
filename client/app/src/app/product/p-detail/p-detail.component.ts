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
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

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

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.getProduct(Number(id));
      this.getComments(Number(id));
    }
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

  // --functions
  toggleDescription(): void {
    this.isDescriptionHidden = !this.isDescriptionHidden;
    this.isRatingHidden = true;
  }

  toggleRating(): void {
    this.isRatingHidden = !this.isRatingHidden;
    this.isDescriptionHidden = true;
  }

  //images
  selectedProductIndex = 0;

  changeIndex(index) {
    this.selectedProductIndex = index;
  }
}
