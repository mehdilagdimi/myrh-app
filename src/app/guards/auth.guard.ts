import { JwtHeader } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtHandlerService } from '../services/jwt-handler.service';

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

    if(token){
      console.log(" token inside guard ", token)
      this.jwtService.setToken(token);

      if (this.jwtService.getUser()) {
        if (this.jwtService.isTokenExpired()) {
            console.log(" user inside token expired ")
           isAuthenticated = false;
        }
      }
    } else {
        isAuthenticated = false;
        this.router.navigateByUrl("/login");
    }
      return isAuthenticated;
    }


  }

