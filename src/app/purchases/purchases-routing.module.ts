import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { PurchasesComponent } from './components/purchases/purchases.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: PurchasesComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
