import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { LocationService } from 'src/app/share/locations.service';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-u-register',
  templateUrl: './u-register.component.html',
  styleUrls: ['./u-register.component.css'],
})
export class URegisterComponent {
  signupForm: FormGroup;
  makeSubmit: boolean = false;
  titleForm: string;
  hide = true;
  apiAnswer: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  roles: any;

  constructor(
    public fb: FormBuilder,
    //private locationService: LocationService,
    private gService: GenericService
  ) {
    this.reactiveForm();
    this.titleForm = 'User Registration';
    this.rolesList();
  }

  reactiveForm() {
    this.signupForm = this.fb.group({
      id: [
        null,
        Validators.compose([Validators.required, Validators.minLength(9)]),
      ],
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
        Validators.compose([Validators.required, Validators.minLength(3), Validators.email]),
      ],
      password: ['', Validators.required],
      company_name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      // province: ['', Validators.required],
      // canton: ['', Validators.required],
      // district: ['', Validators.required],
      // direction: ['', Validators.required],
      // postal_code: ['', Validators.required],
      // address: this.fb.group({
      //   province: ['', Validators.required],
      //   canton: ['', Validators.required],
      //   district: ['', Validators.required],
      //   direction: ['', Validators.required],
      //   postal_code: ['', Validators.required],
      //   phone: [
      //     null,
      //     Validators.compose([Validators.required, Validators.minLength(8)]),
      //   ],
      // }),
      roles: [null, Validators.required],
    });
  }

  rolesList() {
    this.roles = null;
    this.gService
      .list('roles')
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        this.roles = apiData;
      });
  }


  public errorHandling = (control: string, error: string) => {
    return (
      this.signupForm.controls[control].hasError(error) &&
      this.signupForm.controls[control].invalid &&
      (this.makeSubmit || this.signupForm.controls[control].touched)
    );
  };

  createUser() {
    let roleFormat: any = this.signupForm
      .get('roles')
      .value.map((x) => ({ ['id_role']: x }));

    console.log(this.signupForm);

    // this.gService
    //   .create('users/create', this.signupForm.value)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data: any) => {
    //     this.apiAnswer = data;
    //   });
  }
}
