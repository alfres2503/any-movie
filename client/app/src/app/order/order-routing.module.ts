import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { SellerListComponent } from './seller-list/seller-list.component';

const routes: Routes = [
  { path: 'orders/client/:id', component: ClientListComponent },
  { path: 'orders/seller/:id', component: SellerListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
