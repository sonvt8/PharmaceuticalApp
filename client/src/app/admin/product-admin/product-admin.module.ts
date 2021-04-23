import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAdminRoutingModule } from './product-admin-routing.module';
import { ShowDeleteProductComponent } from './show-delete-product/show-delete-product.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';


@NgModule({
  declarations: [ShowDeleteProductComponent, AddEditProductComponent],
  imports: [
    CommonModule,
    ProductAdminRoutingModule
  ]
})
export class ProductAdminModule { }
