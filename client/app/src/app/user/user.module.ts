import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ULoginComponent } from './u-login/u-login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { URegisterComponent } from './u-register/u-register.component';
import { UListComponent } from './u-list/u-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UEditComponent } from './u-edit/u-edit.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { PMethodFormComponent } from './p-method-form/p-method-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ULoginComponent,
    URegisterComponent,
    UListComponent,
    UEditComponent,
    AddressFormComponent,
    PMethodFormComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  exports: [
    ULoginComponent,
    URegisterComponent,
    UListComponent,
    UEditComponent,
    AddressFormComponent,
    PMethodFormComponent,
  ],
})
export class UserModule {}
