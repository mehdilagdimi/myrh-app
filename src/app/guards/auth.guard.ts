import { JwtHeader } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtHandlerService } from '../services/jwt-handler.service';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: AuthService,
    private authStorageService: LocalStorageService,
    private jwtService: JwtHandlerService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var isAuthenticated:boolean = true;
    var token = this.authStorageService.get("myrh-token");
    console.log("route in ", route.url.toString());
    if(token){
      console.log(" token inside guard ", token)
      this.jwtService.setToken(token);

      if (this.jwtService.getUser()) {
        if (this.jwtService.isTokenExpired()) {
            console.log(" user inside token expired ")
            this.authStorageService.remove("myrh-token");
            isAuthenticated = false;
        }else if(route.url.toString() == "login" || route.url.toString() == "signup"){
          this.router.navigateByUrl("/home")
        }
      } else {
        isAuthenticated = false;
      }
    } else {isAuthenticated = false;}

      if(route.url.toString() == "login" || route.url.toString() == "signup") return true;
      if(!isAuthenticated) this.router.navigateByUrl("/login");

      return isAuthenticated;
    }


  }

