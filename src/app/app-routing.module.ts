import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationRoutingModule } from './modules/authentication/authentication-routing.module';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';
import { HomeRoutingModule } from './modules/home/home-routing.module';
import { ShopRoutingModule } from './modules/shop/shop-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomeRoutingModule,
  },
  {
    path: 'auth',
    loadChildren: () => AuthenticationRoutingModule,
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardRoutingModule,
  },
  {
    path: 'shop',
    loadChildren: () => ShopRoutingModule,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/dashboard/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
