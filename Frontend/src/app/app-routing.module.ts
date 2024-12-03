import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { StoreComponent } from './store/store.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: ModalLoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'store', component: StoreComponent},
  { path: 'about', component: AboutUsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'pr', component: ProductDetailsComponent},
  {path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
