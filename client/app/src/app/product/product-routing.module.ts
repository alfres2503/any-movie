import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PIndexComponent } from './p-index/p-index.component';
import { PDetailComponent } from './p-detail/p-detail.component';
import { PMaintenanceComponent } from './p-maintenance/p-maintenance.component';

//locahost:3000/products/
const routes: Routes = [
  { path: 'products', component: PIndexComponent },
  { path: 'products/:id', component: PDetailComponent },
  { path: 'products/seller/:id', component: PMaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
