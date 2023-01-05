import { OfferService } from './../../services/offer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  cities!:any[]
  contracts!:String[]
  constructor(private offerService:OfferService) {
    this.offerService.getCitites().subscribe(
      response => this.cities = response.results)
    this.offerService.getAddOfferFields().subscribe(
        response => {
                   this.contracts = response.data.offerType;
        });
  }

  ngOnInit(): void {

  }

}
