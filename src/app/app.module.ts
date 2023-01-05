import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { OfferComponent } from './components/offer/offer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { OffersComponent } from './components/offers/offers.component';
import { OffersPageComponent } from './components/pages/offers-page/offers-page.component';
import { EmployerDashboardComponent } from './components/pages/employer-dashboard/employer-dashboard.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AppHttpInterceptor } from './interceptors/http.interceptor';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { OffersSideBarComponent } from './components/offers-side-bar/offers-side-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    OfferComponent,
    HomeComponent,
    PageNotFoundComponent,
    OffersComponent,
    OffersPageComponent,
    EmployerDashboardComponent,
    AddOfferComponent,
    OffersSideBarComponent,
    SearchBarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
