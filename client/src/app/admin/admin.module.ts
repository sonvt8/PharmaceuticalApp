import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { CreateCategoryComponent } from './category-admin/create-category/create-category.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { AddEditContactComponent } from './contact-admin/add-edit-contact/add-edit-contact.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AddEditProductComponent } from './product-admin/add-edit-product/add-edit-product.component';
import { ProductAdminTestComponent } from './product-admin-test/product-admin-test.component';
import { AddEditProductTestComponent } from './product-admin-test/add-edit-product-test/add-edit-product-test.component';


@NgModule({
  declarations: [AdminComponent, HomeAdminComponent, CategoryAdminComponent, CreateCategoryComponent, ContactAdminComponent, AddEditContactComponent, ProductAdminComponent, AddEditProductComponent, ProductAdminTestComponent, AddEditProductTestComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    FormsModule,
    PaginationModule.forRoot()
  ]
})
export class AdminModule { }
