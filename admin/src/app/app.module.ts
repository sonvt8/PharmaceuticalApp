import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { AccountService } from './_service/account.service';
import { FeedbackService } from './_service/feedback.service';
import { ProductService } from './_service/product.service';
import { JobService } from './_service/job.service';
import { CandidateService } from './_service/candidate.service';
import { CategoryService } from './_service/category.service';
import { ContactService } from './_service/contact.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { CategoryAdminComponent } from './admin/category-admin/category-admin.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { JobAdminComponent } from './admin/job-admin/job-admin.component';
import { ContactAdminComponent } from './admin/contact-admin/contact-admin.component';
import { CandidateAdminComponent } from './admin/candidate-admin/candidate-admin.component';
import { AccountAdminComponent } from './admin/account-admin/account-admin.component';
import { FeedbackAdminComponent } from './admin/feedback-admin/feedback-admin.component';
import { AddEditCategoryComponent } from './admin/category-admin/add-edit-category/add-edit-category.component';
import { AddEditProductComponent } from './admin/product-admin/add-edit-product/add-edit-product.component';
import { AddEditJobComponent } from './admin/job-admin/add-edit-job/add-edit-job.component';
import { AddEditCandidateComponent } from './admin/candidate-admin/add-edit-candidate/add-edit-candidate.component';
import { AddEditContactComponent } from './admin/contact-admin/add-edit-contact/add-edit-contact.component';
import { AddEditFeedbackComponent } from './admin/feedback-admin/add-edit-feedback/add-edit-feedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsAvailablePipe } from './_pipes/is-available.pipe';
import { PhotoEditComponent } from './admin/product-admin/photo-edit/photo-edit.component';
import {FileUploadModule} from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { IsApprovedPipe } from './_pipes/is-approved.pipe';
import { ReviewAdminComponent } from './admin/review-admin/review-admin.component';
import { AddEditReviewComponent } from './admin/review-admin/add-edit-review/add-edit-review.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { RoleManagementComponent } from './admin/account-admin/role-management/role-management.component';
import { UserManagementComponent } from './admin/account-admin/user-management/user-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeAdminComponent,
    CategoryAdminComponent,
    ProductAdminComponent,
    JobAdminComponent,
    ContactAdminComponent,
    CandidateAdminComponent,
    AccountAdminComponent,
    FeedbackAdminComponent,
    AddEditCategoryComponent,
    AddEditProductComponent,
    AddEditJobComponent,
    AddEditCandidateComponent,
    AddEditContactComponent,
    AddEditFeedbackComponent,
    IsAvailablePipe,
    PhotoEditComponent,
    IsApprovedPipe,
    ReviewAdminComponent,
    AddEditReviewComponent,
    RegisterAdminComponent,
    LoginAdminComponent,
    RoleManagementComponent,
    UserManagementComponent,
    RolesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    DataTablesModule,
    FormsModule,
    TabsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  providers: [
    AccountService,
    ProductService,
    CandidateService,
    CategoryService,
    JobService,
    ContactService,
    FeedbackService,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
