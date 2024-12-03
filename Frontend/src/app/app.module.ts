import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SlidershowComponent } from './slidershow/slidershow.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { TrendingProductsComponent } from './trending-products/trending-products.component';
import { StoreComponent } from './store/store.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { MainStoreProductsComponent } from './main-store-products/main-store-products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    SlidershowComponent,
    ModalLoginComponent,
    SignupComponent,
    TrendingProductsComponent,
    StoreComponent,
    SearchBoxComponent,
    FilterMenuComponent,
    MainStoreProductsComponent,
    AboutUsComponent,
    ContactComponent,
    AlertListComponent,
    ProductDetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports: [SlidershowComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
