import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { CreateShopComponent } from '../../components/dashboard/shop/create-shop/create-shop.component';
import { SharedModule } from '../shared/shared.module';
import { NewShopManagerComponent } from '../../components/dashboard/shop/new-shop-manager/new-shop-manager.component';
import { NewManagerComponent } from 'src/app/components/dashboard/hr/new-manager/new-manager.component';
import { ShopSettingsComponent } from '../../components/dashboard/shop/shop-settings/shop-settings.component';

@NgModule({
  declarations: [
    CreateShopComponent,
    NewShopManagerComponent,
    NewManagerComponent,
    ShopSettingsComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
