import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { SignupRequest } from 'src/app/interfaces/signupRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  signupRequest!:SignupRequest;
  // signupRequest:SignupRequest = new SignupRequest();

  roles:String[] = ["EMPLOYER", "VISITOR", "AGENT"]

  constructor(private authService: AuthService, private router:Router) {
    this.signupForm = new FormGroup({
      username : new FormControl('',[
        Validators.required,
        ],
      ),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]
      ),
      password: new FormControl('',[
        Validators.required,
        // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        ],),
      repeatpassword: new FormControl('',[
        Validators.required,
        // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        ],),
      address: new FormControl('',[
        Validators.required
        ],),
      tele: new FormControl('',[
        Validators.required
        ],),
      role: new FormControl(this.roles[0],[
        Validators.required
        ],),
    })
    // this.signupForm.setValue({role : this.roles[0]})

   }

  ngOnInit(): void {

  }


  get username (){ return this.signupForm.get('username')};
  get address (){ return this.signupForm.get('address')};
  get tele (){ return this.signupForm.get('tele')};
  get role (){ return this.signupForm.get('role')};
  get email (){ return this.signupForm.get('email')};
  get password (){ return this.signupForm.get('password')};
  get repeatpassword (){ return this.signupForm.get('repeatpassword')};

  onSubmit() {
    const {repeatpassword, ...rest} = this.signupForm.value;

    console.log(rest)
    // Object.keys(this.signupForm.value)
    // .forEach(key => {
    //   if(this.signupRequest.hasOwnProperty(key)){
    //     console.log("key " + key)
    //     this.signupRequest[key as keyof SignupRequest] = this.signupForm.value[key];
    //   }
    // });

    console.warn(this.signupRequest);
    //signup user
    this.authService.signup(rest).subscribe(
      {
        next: data => console.log("data ", data ),
        error: err => console.error(err)
      });

      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
  });
  }


}
;
