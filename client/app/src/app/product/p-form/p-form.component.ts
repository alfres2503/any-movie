import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-p-form',
  templateUrl: './p-form.component.html',
  styleUrls: ['./p-form.component.css'],
})
export class PFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  titleForm: string = 'Create';
  productForm: FormGroup;

  categories: any;
  types: any;
  images: any = [];

  preview: any = [];

  idProduct: number = 0;
  isCreate: boolean = true;
  productInfo: any;

  submitted = false;
  productAnswer: any;

  img: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.reactiveForm();
    this.typesList();
    this.categoriesList();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProduct = params['id'];

      if (this.idProduct != undefined) {
        this.isCreate = false;
        this.titleForm = 'Edit';

        this.gService
          .get('products/', this.idProduct)
          .pipe(takeUntil(this.destroy$))
          .subscribe((apiData: any) => {
            this.productInfo = apiData;

            this.productForm.setValue({
              id: this.productInfo.id,
              name: this.productInfo.name,
              description: this.productInfo.description,
              quantity: this.productInfo.quantity,
              price: this.productInfo.price,
              id_user: this.productInfo.id_user,
              id_type: this.productInfo.id_type,
              categories: this.productInfo.categories.map((c) => c.category.id),
              images: this.productInfo.images,
            });
            // console.log(this.productForm.value.images);

            this.images = this.productForm.value.images;
            console.log(this.images);
          });
      }
    });
  }

  isNumber(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  }

  //Create Form
  reactiveForm() {
    this.productForm = this.formBuilder.group({
      id: [null, null],
      id_user: [118310145, null],
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [
        null,
        Validators.compose([Validators.required, Validators.minLength(20)]),
      ],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      id_type: [null, Validators.required],
      categories: [null, Validators.required],
      images: [null, Validators.required],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.productForm.controls[control].hasError(error);
  };

  categoriesList() {
    this.categories = null;
    this.gService
      .list('categories')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.categories = apiData;
      });
  }

  typesList() {
    this.types = null;
    this.gService
      .list('types')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.types = apiData;
      });
  }

  getImages(event): any {
    this.images = [];

    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          // Comprimir imagenes para que no crashee el server
          if (!this.img) this.img = new Image();

          this.img.src = reader.result as string;
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg', 0.5);
            // console.log(dataURL);
            if (!this.isCreate) {
              // If in update mode, push an object with the image property
              this.images.push({ image: dataURL.split(',')[1] });
            } else {
              // If not in update mode, push the base64 string directly
              this.images.push(dataURL);
            }
          };
          img.src = reader.result as string;
        };
      }
    }

    console.log(this.images);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createProduct(): void {
    //categories array
    let cateFormat: any = this.productForm
      .get('categories')
      .value.map((x) => ({ ['id_category']: x }));

    this.productForm.patchValue({ categories: cateFormat });
    this.productForm.patchValue({ images: this.images });

    //API create action, sending the complete info
    this.gService
      .create('products', this.productForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //get answer
        this.productAnswer = data;
        this.router.navigate(['/products'], {
          queryParams: { create: 'true' },
        });
      });
  }

  updateProduct(): void {
    this.submitted = true;

    if (
      this.productForm.invalid ||
      this.productForm.value.description.trim().length === 0 ||
      this.productForm.value.name.trim().length === 0
    )
      return;

    let cateFormat: any = this.productForm
      .get('categories')
      .value.map((c) => ({ ['id_category']: c }));

    this.productForm.patchValue({ categories: cateFormat });
    this.productForm.patchValue({ images: this.images });

    this.gService
      .update('products', this.productForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.productAnswer = data;
        this.router.navigate(['/products'], {
          queryParams: { create: 'true' },
        });
      });
  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

  onBack() {
    this.router.navigate(['/products/']);
  }
}
