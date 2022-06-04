import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from '../../components/dashboard/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ShopModule } from './shop/shop.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, ShopModule],
})
export class DashboardModule {}
