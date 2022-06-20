import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard/dashboard.component';
import { HomeComponent } from 'src/app/components/dashboard/home/home.component';
import { HrComponent } from 'src/app/components/dashboard/hr/hr.component';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { UserRoutingModule } from '../user/user-routing.module';
import { ProductsRoutingModule } from './products/products-routing.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent,
      },
      {
        path: 'hr',
        component: HrComponent,
      },
      {
        path: 'products',
        loadChildren: () => ProductsRoutingModule,
      },
      {
        path: 'user',
        loadChildren: () => UserRoutingModule,
      },
      {
        path: 'shop',
        loadChildren: () => ShopRoutingModule,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
