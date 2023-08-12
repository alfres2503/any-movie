import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ClientListComponent } from './client-list/client-list.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { SellerListComponent } from './seller-list/seller-list.component';
import { OBuyComponent } from './o-buy/o-buy.component';

import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    ClientListComponent,
    OrderDetailComponent,
    OrderDialogComponent,
    SellerListComponent,
    OBuyComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ClientListComponent, OrderDetailComponent, OrderDialogComponent, SellerListComponent],
})
export class OrderModule {}
