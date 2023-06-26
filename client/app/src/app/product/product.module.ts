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

@NgModule({
  declarations: [PIndexComponent, PDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
  exports: [
    PIndexComponent,
    PDetailComponent
  ],
})
export class ProductModule {}
