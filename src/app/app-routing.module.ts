import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './core/security/auth-guard.service';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthDataModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: NavBarComponent,
    children: [
      {
        path: 'sampleData',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./home/sampledata/sampledata.module').then(
            m => m.SampleDataModule,
          ),
      },
      {
        path: 'initial',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./home/initial-page/initial-page.module').then(
            m => m.InitialPageModule,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

/* @export
 * @class AppRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      },
    ),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class AppRoutingModule {}
