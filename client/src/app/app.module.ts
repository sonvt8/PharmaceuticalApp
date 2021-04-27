import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { CategoryService } from './_services/category.service';
import { ProductService } from './_services/product.service';
import { ContactService } from './_services/contact.service';
import { JobService } from './_services/job.service';
import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { RegisterComponent } from './account/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AccountComponent,
    CategoriesComponent,
    CategoryListComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminRoutingModule,
    DataTablesModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    PaginationModule.forRoot()
  ],
  providers: [
    Title,CategoryService,ProductService,ContactService,JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
