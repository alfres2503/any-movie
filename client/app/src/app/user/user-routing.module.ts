import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULoginComponent } from './u-login/u-login.component';
import { URegisterComponent } from './u-register/u-register.component';

const routes: Routes = [
  { path: 'logIn', component: ULoginComponent },
  { path: 'signUp', component: URegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
