import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { CreateShopComponent } from '../../../components/dashboard/shop/create-shop/create-shop.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CreateShopComponent],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
