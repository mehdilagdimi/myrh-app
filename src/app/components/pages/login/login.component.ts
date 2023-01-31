import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { LoginRequest } from 'src/app/interfaces/loginRequest';
import { API_URL } from 'src/config/api.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private jwt!:String;
  loading!:boolean;
  loadingLoginResult!:boolean;
  loginForm!:FormGroup;
  isAuthenticated:Boolean = false;
  animationSrc!:string;

  user!: SocialUser;
  selectedRole:string = "VISITOR";
  proccedToLoginPage: boolean = false;


  constructor(private router:Router, private authService: AuthService, private localStorageService:LocalStorageService,
        private socialAuthService: SocialAuthService) {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      const role = `ROLE_${this.user.provider}_${this.selectedRole}`
      // console.log(this.user)
      const logReq:any = {
        idToken: this.user.provider === "GOOGLE" ? this.user.idToken : this.user.authToken,
        role:role,
        provider:this.user.provider
      }
      this.handleLogin(logReq, true)
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [
          Validators.required,
          Validators.email
        ]
      ),
      password: new FormControl('',[
        Validators.required,
        // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ],)
    });
  }


  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


   onSubmit() {
    this.loading = true;
    this.handleLogin(this.loginForm.value, false);
  }


  handleLogin(request:any, isOauth:boolean){
    this.authService.login(request, isOauth).subscribe({
      next : (response) => {
        if(response.status == 200){
          this.jwt = response.data.data;
          this.localStorageService.set("myrh-token", this.jwt.toString());
          this.authService.setAuthState(true);
          this.isAuthenticated = true;
        }
      },

      error : (err) => {
        this.authService.setAuthState(false);
        this.isAuthenticated = false;
        // console.log(" inside fail login")
      },
      complete : ()=> {}
    }
  ).add(() => {
    this.loading = false;
    this.displayCompletionAnimation(this.isAuthenticated);
  });
  }

  displayCompletionAnimation(loginResult:Boolean){
    if(loginResult) this.animationSrc = "https://assets3.lottiefiles.com/packages/lf20_lk80fpsm.json";
    else this.animationSrc = "https://assets9.lottiefiles.com/packages/lf20_q9ik4qqj.json";
    this.loadingLoginResult = true;

    setTimeout(()=> {
      this.loadingLoginResult = false;
      if(!this.isAuthenticated) return;
      this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
            });
    }, 1500);
  }


  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  redirectToFbOauth(){
    window.location.href = this.authService.fb_oauth;
  }


  setRoleAndProceed(value:any){
   console.log(" value " + value)
   this.selectedRole = value;
   this.proccedToLoginPage = true;
  }

  hasRoute(route : string) : boolean {
    return this.router.url === route;
  }


  ngOnDestroy() {
    // if(this.authService.isLoading) this.authService.toggleIsLoading(false);
  }

}
