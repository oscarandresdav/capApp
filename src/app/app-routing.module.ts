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
    path: '',
    redirectTo: '/catalogo',
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
