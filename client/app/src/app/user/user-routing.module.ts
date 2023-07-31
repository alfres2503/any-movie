import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULoginComponent } from './u-login/u-login.component';

const routes: Routes = [
  { path: 'logIn', component: ULoginComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
