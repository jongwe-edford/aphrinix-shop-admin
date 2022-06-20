import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NewProductComponent } from '../../../components/dashboard/products/new-product/new-product.component';
import { ProductListComponent } from '../../../components/dashboard/products/product-list/product-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NewProductComponent, ProductListComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
