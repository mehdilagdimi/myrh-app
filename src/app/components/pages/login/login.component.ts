import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading!:boolean;
  loginForm!:FormGroup;
  isAuthenticated:Boolean = false;

  constructor(private router:Router, private authService: AuthService, private localStorageService:LocalStorageService) {
    this.loading = this.authService.isLoading;
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  ngOnInit(): void {
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
    this.authService.toggleIsLoading(true);
    this.authService.login(this.loginForm.value);
    console.warn(this.loginForm.value);
    console.warn("is auth after login", this.authService.isAuthenticated);
    // if(this.authService.isAuthenticated){
    //   this.router.navigate(['/home'])
    //       .then(() => {
    //         window.location.reload();
    //   });
    // }
    //  else {
    //   this.router.navigate(['/login'])
    //       .then(() => {
    //         window.location.reload();
    //   });
      // this.router.navigateByUrl("/login");
    }
  }


  hasRoute(route : string) : boolean {
    return this.router.url === route;
  }

  ngOnDestroy() {
    if(this.authService.isLoading) this.authService.toggleIsLoading(false);
  }

}
