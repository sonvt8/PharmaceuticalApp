import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AdminComponent } from './admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { CreateCategoryComponent } from './category-admin/create-category/create-category.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "", redirectTo: "home-admin", pathMatch: "full"
      },
      {
        path: "home-admin", component: HomeAdminComponent
      },
      {
        path: "category-admin", component: CategoryAdminComponent,
      },
      {
        path: "product-admin", component: ProductAdminComponent,
      }
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
