import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from '../../components/dashboard/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from './products/products.module';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard/dashboard.component';
import { HrComponent } from '../../components/dashboard/hr/hr.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, HrComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, ProductsModule, UserModule],
})
export class DashboardModule {}
