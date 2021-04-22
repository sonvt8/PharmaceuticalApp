import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';


@NgModule({
  declarations: [AdminComponent, HomeAdminComponent, CategoryAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule
  ]
})
export class AdminModule { }
