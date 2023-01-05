import { JwtHandlerService } from './jwt-handler.service';
import { LocalStorageService } from './local-storage.service';
import { SignupRequest } from 'src/app/interfaces/signupRequest';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Response } from '../interfaces/response';
import { LoginRequest } from '../interfaces/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading!:boolean;
  authLoading = new Subject<boolean>();

  private _url = "http://localhost:8080/api";
  private jwt!:String;


  constructor(
    private http: HttpClient,
    private localStorageService:LocalStorageService
    ) {
     this.authLoading.subscribe((value) => this.isLoading = value)
   }

  signup(newUser : SignupRequest) : Observable<Response<String>>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    console.log(" new user " + newUser.email)
    console.log(" new user " + newUser.password)
    return this.http
            .post<any>(
              `${this._url}/signup`, newUser, {headers}
            );
  }

  login(loginCredentials : LoginRequest) : Subscription{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http
            .post<Response<String>>(
              `${this._url}/auth`, loginCredentials, {headers}
            ).subscribe(response => {
              this.jwt = response.data.data;
              this.localStorageService.set("myrh-token", this.jwt.toString());
              this.toggleIsLoading(false);
            });
  }

  toggleIsLoading(isLoading:boolean):boolean{
    this.authLoading.next(isLoading);
    return isLoading;
  }
  logout() {
    localStorage.removeItem("myrh-token");
  }

  // public isLoggedIn() {
  //     return moment().isBefore(this.getExpiration());
  // }
 

  // isLoggedOut() {
  //     return !this.isLoggedIn();
  // }

  // getExpiration() {
  //     const expiration = localStorage.getItem("expires_at");
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  // }

}
