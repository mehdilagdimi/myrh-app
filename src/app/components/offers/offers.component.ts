import { OfferService } from './../../services/offer.service';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/interfaces/offer';
import { Response } from '../../interfaces/response';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  response?:Response<Offer[]>;
  offers?: Offer[];
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService
    .getOffers()
    .subscribe( response => {
      this.response = response
      this.offers = this.response?.data.data;
      console.log("data offers " + this.offers);
    });
  }
}
