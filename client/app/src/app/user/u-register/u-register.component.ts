import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificationService,
  MessageType,
} from 'src/app/share/notification.service';
import axios, { AxiosResponse } from 'axios';

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

  //authorization: any;
  API_KEY = 'palita3015@gmail.com:03693b784bfbda738e5a';
  API_BASE_URL = 'https://api.alegra.com/api/v1';

  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
    this.titleForm = 'User Registration';

    async function getLocations(): Promise<void> {
      try {
        const apiInstance = axios.create({
          baseURL: this.API_BASE_URL,
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.API_KEY}:`).toString(
              'base64'
            )}`,
          },
        });
        console.log(apiInstance);

        // const response: AxiosResponse = await apiInstance.get(
        //   '/countries/CR/identificationTypes'
        // );

        // const tiposIdentificacion = response.data;
        // console.log('Tipos de Identificación en Costa Rica:');
        // console.log(tiposIdentificacion);
      } catch (error) {
        console.error(
          'Error:',
          error.response?.status,
          '-',
          error.response?.data
        );
      }
    }
  }

  reactiveForm() {
    this.signupForm = this.fb.group({
      FirstName: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      Email: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      password: ['', Validators.required],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.signupForm.controls[control].hasError(error) &&
      this.signupForm.controls[control].invalid &&
      (this.makeSubmit || this.signupForm.controls[control].touched)
    );
  };
}
