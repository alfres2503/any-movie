import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { LocationService } from 'src/app/share/locations.service';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-u-edit',
  templateUrl: './u-edit.component.html',
  styleUrls: ['./u-edit.component.css'],
})
export class UEditComponent implements OnInit {
  userForm: FormGroup;
  makeSubmit: boolean = false;

  isAuth: boolean;
  currentUser: any;

  destroy$: Subject<boolean> = new Subject<boolean>();
  idUser: number;

  userInfo: any;
  userImage: any;

  isSeller: boolean = false;

  provinces: any;
  cantons: any;
  districts: any;

  constructor(
    public fb: FormBuilder,
    //private locationService: LocationService,
    private gService: GenericService,
    private notification: NotificationService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
    private location: LocationService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
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

          this.userForm.setValue({
            name: this.userInfo.name,
            phone: this.userInfo.phone,
            email: this.userInfo.email,
            image: this.userInfo.image,
          });
        });
    }

    this.reactiveForm();

    this.getProvinces();
  }

  ngOnInit(): void {}

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

  async getProvinces() {
    this.provinces = await this.location.getProvinces();
    const provincesArray = Object.entries(this.provinces).map(([id, name]) => ({
      id,
      name,
    }));
    this.provinces = provincesArray;
  }

  async getCantons(idProvince) {
    const cantons = await this.location.getCantons(idProvince);
    const cantonsArray = Object.entries(cantons).map(([id, name]) => ({
      id,
      name,
      provinceId: idProvince, // Add provinceId property to the object
    }));
    this.cantons = cantonsArray;
  }

  async getDistricts(idCanton, idProvince) {
    const districts = await this.location.getDistricts(idProvince, idCanton);
    const districtsArray = Object.entries(districts).map(([id, name]) => ({
      id,
      name,
    }));
    this.districts = districtsArray;
  }
}
