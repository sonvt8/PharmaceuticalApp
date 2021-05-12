import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AccountComponent } from './accounts/account.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ForgotPasswordComponent } from './accounts/forgot-password/forgot-password.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ResetPasswordComponent } from './accounts/reset-password/reset-password.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ResumesComponent } from './profile/resumes/resumes.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'user/profile',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'detail', component: ProfileDetailComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'resumes', component: ResumesComponent }
    ]
  },
  { path: 'contact', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'feedback', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], component: FeedbackComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/categories/:id', component: ProductsComponent },
  {
    path: 'jobs', component: JobsComponent,
    children: [
      { path: '', component: JobsListComponent, data: { x: true } },
      { path: ':id', component: JobDetailComponent, data: { x: false } }
    ]
  },
  { path: 'product-search', component: ProductSearchComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
