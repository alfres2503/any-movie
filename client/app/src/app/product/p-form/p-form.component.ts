import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-p-form',
  templateUrl: './p-form.component.html',
  styleUrls: ['./p-form.component.css'],
})
export class PFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  idProduct: number = 0;
  isCreate: boolean = true;
  titleForm: string;
  productInfo: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    this.activeRouter.params.subscribe((params: Params) => {
      this.idProduct = params['id'];

      if (this.idProduct != undefined) {
        this.isCreate = false;
        this.titleForm = 'Edit Product';

        this.gService
          .get('products', this.idProduct)
          .pipe(takeUntil(this.destroy$))
          .subscribe((apiData: any) => {
            this.productInfo = apiData;
            console.log(this.productInfo);
          });
      }
    });
  }
}
