import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './accounts/account.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './about-us/about-us.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CategoryService } from './_services/category.service';
import { ForgotPasswordComponent } from './accounts/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './accounts/reset-password/reset-password.component';
import { ProductService } from './_services/product.service';
import { ProductListComponent } from './products/product-list/product-list.component';
import { SafePipe } from './_helpers/safepipe';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ResumesComponent } from './profile/resumes/resumes.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PhoneMaskDirective } from './_helpers/phone-mask.directive';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { JobService } from './_services/job.service';
import { CateItemComponent } from './header/cate-item/cate-item.component';
import { QuoteComponent } from './home/quote/quote.component';
import { InterceptorService } from './_helpers/loading.interceptor';
import { IsApprovedPipe } from './_pipes/is-approved.pipe';
import { ReviewDetailsComponent } from './products/product-detail/reviews/review-details/review-details.component';
import { ReviewsComponent } from './products/product-detail/reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    RegisterComponent,
    ContactUsComponent,
    CategoriesComponent,
    CategoryListComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    AboutUsComponent,
    AlertsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ProfileDetailComponent,
    ChangePasswordComponent,
    ResumesComponent,
    ReviewDetailsComponent,
    FeedbackComponent,
    JobsComponent,
    JobDetailComponent,
    PhoneMaskDirective,
    ReviewDetailsComponent,
    ProductSearchComponent,
    CateItemComponent,
    JobsListComponent,
    IsApprovedPipe,
    QuoteComponent,
    ReviewsComponent
  ],
  exports: [PhoneMaskDirective],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxUsefulSwiperModule,
    TabsModule,
    CollapseModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right'
    })
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CategoryService,
    ProductService,
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
