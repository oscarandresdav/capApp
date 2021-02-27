import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [PurchasesComponent],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    MaterialModule
  ]
})
export class PurchasesModule { }
