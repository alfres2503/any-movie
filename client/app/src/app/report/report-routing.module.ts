import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RSellerComponent } from './r-seller/r-seller.component';
import { RAdminComponent } from './r-admin/r-admin.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  { path: 'reports/seller', component: RSellerComponent },
  {
    path: 'reports/admin',
    component: RAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
