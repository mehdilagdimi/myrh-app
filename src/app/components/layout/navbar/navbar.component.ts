import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  hasRoute(route:String) : boolean {
    // console.log(" router " + route)
    return this.router.url === route;
  }

  logout() {
    // console.log(" inside logout")
    this.authService.logout();
    this.router.navigateByUrl("/login")
  }
}
