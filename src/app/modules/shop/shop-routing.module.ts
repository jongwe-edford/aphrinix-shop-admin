import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewShopManagerComponent } from 'src/app/components/dashboard/shop/new-shop-manager/new-shop-manager.component';
import { ShopSettingsComponent } from 'src/app/components/dashboard/shop/shop-settings/shop-settings.component';
import { CreateShopComponent } from 'src/app/components/dashboard/shop/create-shop/create-shop.component';

const routes: Routes = [
  {
    path: 'register',
    component: NewShopManagerComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateShopComponent,
  },
  {
    path: 'settings',
    component: ShopSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
