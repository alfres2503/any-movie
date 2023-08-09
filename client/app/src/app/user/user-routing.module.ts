import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULoginComponent } from './u-login/u-login.component';
import { URegisterComponent } from './u-register/u-register.component';
import { UListComponent } from './u-list/u-list.component';

const routes: Routes = [
  { path: 'logIn', component: ULoginComponent },
  { path: 'signUp', component: URegisterComponent },
  { path: 'users', component: UListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
