import { JwtHandlerService } from './jwt-handler.service';
import { LocalStorageService } from './local-storage.service';
import { SignupRequest } from 'src/app/interfaces/signupRequest';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Response } from '../interfaces/response';
import { LoginRequest } from '../interfaces/loginRequest';
import { API_URL } from 'src/config/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStateSubject!:BehaviorSubject<boolean>;
  isAuthenticated!:boolean;

  fb_oauth = `${API_URL}/oauth2/authorization/facebook`;
  fb_oauth_api_url = `${API_URL}/login/oauth2/code/facebook`

  constructor(
    private http: HttpClient,
    private localStorageService:LocalStorageService,
    private jwtService:JwtHandlerService
    ) {

     if(!this.jwtService.isTokenExpired()) {
      // this.isAuthenticated = true;
      this.authStateSubject = new BehaviorSubject<boolean>(true);
    } else {
      // this.isAuthenticated = false;
      this.authStateSubject = new BehaviorSubject<boolean>(false);
    }

     this.authStateSubject.subscribe(
          (newValue) => this.isAuthenticated = newValue
      )
   }

  signup(newUser : SignupRequest) : Observable<Response<String>>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http
            .post<any>(
              `${API_URL}/signup`, newUser, {headers}
            );
  }

  login(loginCredentials : LoginRequest, isOauth:Boolean) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    var url = `${API_URL}/auth?` + (isOauth ? `oauth=${isOauth}&provider=${loginCredentials.provider}` : "");

    // console.log(" auth eq ", `${API_URL}/auth?oauth=${isOauth}`);

    return this.http
            .post<Response<String>>(
              url, loginCredentials, {headers}
            );
  }

  setAuthState(authState:boolean){
    this.authStateSubject.next(authState);
  }

  getAuthState() : Observable<boolean>{
    return this.authStateSubject.asObservable();
  }


  logout() {
    // console.log(" is auth inside service ", this.isAuthenticated)
    localStorage.removeItem("myrh-token");
    this.setAuthState(false);
  }

}
