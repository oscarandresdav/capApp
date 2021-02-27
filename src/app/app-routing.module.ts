import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'catalogo',
    canActivate: [AdminGuard],
    loadChildren: () =>
    import('./catalogo/catalogo.module').then((m) => m.CatalogoModule),
  },
  {
    path: 'ventas',
    canActivate: [AdminGuard],
    loadChildren: () =>
    import('./sales/sales.module').then((m) => m.SalesModule),
  },
  {
    path: 'compras',
    canActivate: [AdminGuard],
    loadChildren: () =>
    import('./purchases/purchases.module').then((m) => m.PurchasesModule),
  },
  {
    path: 'reportes',
    canActivate: [AdminGuard],
    loadChildren: () =>
    import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
    )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
