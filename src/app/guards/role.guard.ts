import { LocalStorageService } from './../services/local-storage.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHandlerService } from '../services/jwt-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  role!:String;
  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private jwtService:JwtHandlerService,
    private router: Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var token = this.localStorageService.get("myrh-token");
      var url = route.url.toString();
      if(token){
        this.jwtService.setToken(token);
        this.role = this.jwtService.getRole()!;
        console.log(" url inside role guard", route.url.toString())

        if(url.includes("employer")){
          console.log(" inside employer/ url")
          if(this.role == "ROLE_EMPLOYER") return true;
        }
        if(url.includes("agent")){
          console.log(" inside agent/ url")
          if(this.role == "ROLE_AGENT") return true;
        }
      }

      this.router.navigateByUrl("/home")
      return false;
  }

}
