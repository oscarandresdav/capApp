import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './components/sales/sales.component';
import { MaterialModule } from './../material/material.module'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SalesModule { }
