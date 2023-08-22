import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

import {
  NotificationService,
  MessageType,
} from 'src/app/share/notification.service';

@Component({
  selector: 'app-u-login',
  templateUrl: './u-login.component.html',
  styleUrls: ['./u-login.component.css'],
})
export class ULoginComponent {
  hide = true;
  loginForm: FormGroup;
  makeSubmit: boolean = false;

  userInfo: any;

  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.messages();
  }

  messages() {
    // user register successfully
    let register = false;
    let auth = '';

    // get url parameters
    this.route.queryParams.subscribe((params) => {
      register = params['register'] === 'true' || false;
      auth = params['auth'] || '';
      if (register) {
        this.notification.message(
          'User',
          'Registered user! Specify your credentials.',
          MessageType.success
        );
      }
      if (auth) {
        this.notification.message(
          'User',
          'You must authenticate to access this page.',
          MessageType.warning
        );
      }
    });
  }

  onReset() {
    this.loginForm.reset();
  }

  onPasswordKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submitForm();
    }
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.loginForm.controls[control].hasError(error) &&
      this.loginForm.controls[control].invalid &&
      (this.makeSubmit || this.loginForm.controls[control].touched)
    );
  };

  submitForm() {
    this.makeSubmit = true;
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
    this.authService.loginUser(this.loginForm.value).subscribe(
      (answer: any) => {
        if(this.authService.isAdmin){
          window.location.href = '/reports/admin';
        } else if(this.authService.isSeller){
          window.location.href = '/reports/seller';
        } else {
          window.location.href = '/';
        }
      },
      (error) => {
        this.notification.message(
          'Authentication failed',
          error.error.message,
          MessageType.error
        );
      }
    );
  }
}
