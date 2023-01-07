import { OfferService } from './../../services/offer.service';
import { JwtHandlerService } from './../../services/jwt-handler.service';
import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/interfaces/offer';
import { IUpdateOffer } from 'src/app/interfaces/updateOffer';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  @Input() offer!: Offer;
  @Input("isShowDetails") showDetails!: Boolean;
  userRole!:string;
  updateOfferTemp!:IUpdateOffer;

  constructor(private jwtService:JwtHandlerService, private offerService:OfferService) {
  }

  ngOnInit(): void {
    this.userRole = this.jwtService.getRole()!;
    console.log(" user role inside offer comp "+ this.userRole)
  }


  updateStatus(status:number){
    this.updateOfferTemp = {
      offerStatus : ""
    }
    if(status == 1){
      this.updateOfferTemp.offerStatus = "ACCEPTED";
    } else if(status == 2){
      this.updateOfferTemp.offerStatus = "DENIED";
    }
    this.offerService.updateOfferStatus(this.updateOfferTemp);
    this.updateOfferTemp = {};
  }
}
