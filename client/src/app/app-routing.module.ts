import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AccountComponent } from './accounts/account.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'account', component: AccountComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'product-1', component: ProductDetailComponent},
  {path: 'category-1', component: ProductListComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
