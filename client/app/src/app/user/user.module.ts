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
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ULoginComponent
  ],
  imports: [CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule, MatIconModule,
    LayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule, UserRoutingModule],
  exports: [
    ULoginComponent
  ],
})
export class UserModule { }
