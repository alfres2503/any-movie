import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { OBuyComponent } from './o-buy/o-buy.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: 'orders/client/:id', component: ClientListComponent },
  { path: 'orders/seller/:id', component: SellerListComponent },
  { path: 'orders/buy', component: OBuyComponent },
  { path: 'order/:id', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
