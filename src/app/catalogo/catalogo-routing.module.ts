import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: CatalogoComponent },
      { path: 'nuevo', component: ProductFormComponent },
      { path: 'editar/:id', component: ProductEditComponent },
      { path: 'eliminar/:id', component: ProductDeleteComponent },
      { path: ':id', component: ProductDetailComponent },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
