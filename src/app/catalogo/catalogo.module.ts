import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDeleteComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFormComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CatalogoModule { }
