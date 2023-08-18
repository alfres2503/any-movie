import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MarkAsDeliveredComponent } from './mark-as-delivered/mark-as-delivered.component';

@NgModule({
  declarations: [
    ClientListComponent,
    OrderDetailComponent,
    OrderDialogComponent,
    SellerListComponent,
    OBuyComponent,
    MarkAsDeliveredComponent,
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ClientListComponent,
    OrderDetailComponent,
    OrderDialogComponent,
    SellerListComponent,
    OBuyComponent,
    MarkAsDeliveredComponent,
  ],
})
export class OrderModule {}
