import { JwtHandlerService } from './../../../services/jwt-handler.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userEmail!:string;
  userRole!:string;
  dashboard!:string;
  loginPath:string = "/login"
  isAuthenticated!:boolean;

  constructor(private router:Router, private authService:AuthService, private jwtService:JwtHandlerService) {
    // this.isAuthenticated = authService.isAuthenticated;
    this.authService.getAuthState().subscribe((newState) => this.isAuthenticated = newState)
  }

  ngOnInit(): void {
    this.userEmail = this.jwtService.getEmail()!;
    this.userRole = this.jwtService.getRole()!;
    if(this.userRole == "ROLE_EMPLOYER") this.dashboard = "/employer";
    else if(this.userRole == "ROLE_AGENT") this.dashboard = "/agent";

    console.log(" is authenticated " , this.isAuthenticated)
  }

  hasRoute(route:String) : boolean {
    // console.log(" router " + route)
    return this.router.url === route;
  }

  navigateToHome(){
    this.router.navigateByUrl("/home")
  }

  logout() {
    // console.log(" inside logout")
    this.authService.logout();
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }


}
