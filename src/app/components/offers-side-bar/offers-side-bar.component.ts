import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-side-bar',
  templateUrl: './offers-side-bar.component.html',
  styleUrls: ['./offers-side-bar.component.css']
})
export class OffersSideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToElement($element:any){
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
