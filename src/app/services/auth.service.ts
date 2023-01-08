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
  isLoading!:boolean;
  authLoading = new Subject<boolean>();


  private jwt!:String;


  constructor(
    private http: HttpClient,
    private localStorageService:LocalStorageService,
    private jwtService:JwtHandlerService
    ) {

     this.authLoading.subscribe((value:any) => this.isLoading = value)


     if(!this.jwtService.isTokenExpired()) {
      console.log(" inside is not expired")
      // this.isAuthenticated = true;
      this.authStateSubject = new BehaviorSubject<boolean>(true);
    } else {
      console.log(" inside is expired")
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

    console.log(" new user " + newUser.email)
    console.log(" new user " + newUser.password)
    return this.http
            .post<any>(
              `${API_URL}/signup`, newUser, {headers}
            );
  }

  login(loginCredentials : LoginRequest) : Subscription{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http
            .post<Response<String>>(
              `${API_URL}/auth`, loginCredentials, {headers}
            ).subscribe(response => {
              if(response.status == 200){
                this.jwt = response.data.data;
                console.log(" this jwt", this.jwt)
                console.log(" this jwt to strign", this.jwt.toString())
                console.log(" this jwt json stringify", JSON.stringify(this.jwt))
                this.localStorageService.set("myrh-token", JSON.stringify(this.jwt));
                this.setAuthState(true);
              } else {
                this.setAuthState(false);
              }
              this.toggleIsLoading(false);
            });
  }

  setAuthState(authState:boolean){
    //echo the new value
    // console.log(" inside set auth", String(authState))
    // console.log(authState.toString())
    this.authStateSubject.next(authState);

  }
  getAuthState() : Observable<boolean>{
    return this.authStateSubject.asObservable();
  }
  toggleIsLoading(isLoading:boolean):boolean{
    this.authLoading.next(isLoading);
    return isLoading;
  }


  logout() {
    console.log(" is auth inside service ", this.isAuthenticated)
    localStorage.removeItem("myrh-token");
    this.setAuthState(false);
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
