import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ULoginComponent } from './u-login/u-login.component';
import { UDetailComponent } from './u-detail/u-detail.component';


@NgModule({
  declarations: [
    ULoginComponent,
    UDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
