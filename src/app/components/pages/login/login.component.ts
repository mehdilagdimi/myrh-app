import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


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
  loggedIn!: boolean;

  constructor(private router:Router, private authService: AuthService, private localStorageService:LocalStorageService,
        private socialAuthService: SocialAuthService) {
    // this.loading = this.authService.isLoading;
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
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
    this.authService.login(this.loginForm.value).subscribe({
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
          console.log(" inside fail login")
          // this.router.navigate(['/login'])
          //   .then(() => {
          //     window.location.reload();
          // });
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


  hasRoute(route : string) : boolean {
    return this.router.url === route;
  }


  ngOnDestroy() {
    // if(this.authService.isLoading) this.authService.toggleIsLoading(false);
  }

}
