import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './components/offer/offer.component';
import { OffersComponent } from './components/offers/offers.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : 'home',  component: HomeComponent},
  {path : 'offers', component: OffersComponent, canActivate: [AuthGuard]},
  {path : 'add-offer', component: AddOfferComponent, canActivate: [AuthGuard]},
  {path : 'signup', component: SignupComponent},
  {path : 'login', component: LoginComponent},
  {path : "**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
