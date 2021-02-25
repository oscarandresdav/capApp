import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFirebaseService } from './services/product.firebase.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProductFirebaseService
  ]
})
export class CoreModule { }
