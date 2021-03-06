import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountAdminComponent } from './admin/account-admin/account-admin.component';
import { AdminComponent } from './admin/admin.component';
import { CandidateAdminComponent } from './admin/candidate-admin/candidate-admin.component';
import { CategoryAdminComponent } from './admin/category-admin/category-admin.component';
import { ContactAdminComponent } from './admin/contact-admin/contact-admin.component';
import { FeedbackAdminComponent } from './admin/feedback-admin/feedback-admin.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { JobAdminComponent } from './admin/job-admin/job-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { ReviewAdminComponent } from './admin/review-admin/review-admin.component';
import { AdminGuard } from './_guards/admin.guard';

const routes: Routes = [
  {path: '', component: HomeAdminComponent},
  {
    path: '', 
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: "category-admin", component: CategoryAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "product-admin", component: ProductAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "contact-admin", component: ContactAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "job-admin", component: JobAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "account-admin", component: AccountAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "feedback-admin", component: FeedbackAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "candidate-admin", component: CandidateAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "review-admin", component: ReviewAdminComponent, canActivate: [AdminGuard],
      },
      {
        path: "register-admin", component: RegisterAdminComponent
      },
      {
        path: "login-admin", component: LoginAdminComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
