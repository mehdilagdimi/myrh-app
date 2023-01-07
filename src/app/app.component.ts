import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myrh-app';

  constructor(private router:Router){}

  hasRoute(routes:string[]) :boolean{
    return routes.some(route => this.router.url == route);
  }
}
