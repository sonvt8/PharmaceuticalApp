import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'account', component: AccountComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
