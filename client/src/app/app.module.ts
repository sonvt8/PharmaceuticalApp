import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AccountComponent,
    RegisterComponent,
    ContactUsComponent,
    CategoriesComponent,
    CategoryListComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxUsefulSwiperModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
