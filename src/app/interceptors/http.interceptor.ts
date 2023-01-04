import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private authStorageService:LocalStorageService,
    private router:Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authStorageService.get("myrh-token");

    //check if requesting another domain other than localhost so we don't include Authorization header
    if(request.url.includes("parseapi.back4app.com")) return next.handle(request);

    if (token) {
        const clonedReq = request.clone({
            headers: request.headers
                  .set("Authorization", "Bearer " + token)
        });

        return next.handle(clonedReq);
    } else {
        return next.handle(request);
    }

  }
}
