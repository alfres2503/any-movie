import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { PIndexComponent } from './p-index/p-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PDetailComponent } from './p-detail/p-detail.component';
import { PMaintenanceComponent } from './p-maintenance/p-maintenance.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { PFormComponent } from './p-form/p-form.component';

@NgModule({
  declarations: [PIndexComponent, PDetailComponent, PMaintenanceComponent, PFormComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
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
  ],
  exports: [PIndexComponent, PDetailComponent, PMaintenanceComponent, PFormComponent],
})
export class ProductModule {}
