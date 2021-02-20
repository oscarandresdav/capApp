import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CatalogoComponent,
    ProductDeleteComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CatalogoModule { }
