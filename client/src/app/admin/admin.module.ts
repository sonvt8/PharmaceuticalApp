import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { CreateCategoryComponent } from './category-admin/create-category/create-category.component';


@NgModule({
  declarations: [AdminComponent, HomeAdminComponent, CategoryAdminComponent, CreateCategoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    FormsModule
  ]
})
export class AdminModule { }
