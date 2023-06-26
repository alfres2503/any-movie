import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PIndexComponent } from './p-index/p-index.component';
import { PDetailComponent } from './p-detail/p-detail.component';

//locahost:3000/products/
const routes: Routes = [
  { path: 'products', component: PIndexComponent },
  { path: 'products/:id', component: PDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
