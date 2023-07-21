import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PIndexComponent } from './p-index/p-index.component';
import { PDetailComponent } from './p-detail/p-detail.component';
import { PMaintenanceComponent } from './p-maintenance/p-maintenance.component';
import { PFormComponent } from './p-form/p-form.component';

//locahost:3000/products/
const routes: Routes = [
  // Este perro hp tiene que estar orderado así o si no no funca
  { path: 'products', component: PIndexComponent },
  { path: 'products/seller/:id', component: PMaintenanceComponent },
  { path: 'products/create', component: PFormComponent },
  { path: 'products/:id', component: PDetailComponent },
  { path: 'products/update/:id', component: PFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
