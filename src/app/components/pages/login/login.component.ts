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

  constructor(private router:Router, private authService: AuthService, private localStorageService:LocalStorageService) {
    this.loading = this.authService.isLoading;
  }
  loginForm!:FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('thisemail', [
          Validators.required,
          Validators.email
        ]
      ),
      password: new FormControl('this.password',[
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
    this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
    });
    // this.router.navigateByUrl("/home");
  }


  hasRoute(route : string) : boolean {
    return this.router.url === route;
  }

  ngOnDestroy() {
    if(this.authService.isLoading) this.authService.toggleIsLoading(false);
  }

}
