import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ClientListComponent } from './client-list/client-list.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { SellerListComponent } from './seller-list/seller-list.component';

@NgModule({
  declarations: [
    ClientListComponent,
    OrderDetailComponent,
    OrderDialogComponent,
    SellerListComponent,
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
  ],
  exports: [ClientListComponent, OrderDetailComponent, OrderDialogComponent, SellerListComponent],
})
export class OrderModule {}
