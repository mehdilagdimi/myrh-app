import { JwtHandlerService } from './../../services/jwt-handler.service';
import { AuthService } from './../../services/auth.service';
import { OfferService } from './../../services/offer.service';
import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/interfaces/offer';
import { Response } from '../../interfaces/response';
import { PaginationInstance } from 'ngx-pagination';
import { FilterOperation } from 'src/app/interfaces/filterOperation';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  getForEmp!:Boolean;
  getForAgn!:Boolean;
  response!:Response<Offer[]>;
  offers!: Offer[];
  isLoading!:boolean;
  filters!:FilterOperation[];
  userRole!:String;

  constructor(private offerService: OfferService, private jwtService:JwtHandlerService) {
    this.userRole = this.jwtService.getRole()!;

    this.getForEmp = this.jwtService.getRole()! == "ROLE_EMPLOYER" ? true : false;
    this.getForAgn = this.jwtService.getRole()! == "ROLE_AGENT" ? true : false;

    this.offerService.getSearchValsObser().subscribe(
      val => {
        console.log(" filter inside offers compo constr" , val)
        this.filters = val;
        this.fetchOffers();
      }
    )
  }


  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1
  };
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  public eventLog: string[] = [];

  private popped : any = [];


  ngOnInit(): void {
    // fetch offers on init
    this.fetchOffers();
  }


  fetchOffers(){
    console.log("offers compo fetch method" , this.filters)
    this.isLoading = true;
    if(this.userRole !== "ROLE_EMPLOYER"){
      this.offerService
      .getOffers(this.filters)
      .subscribe( response => {
        this.response = response
        this.offers = this.response?.data.data;
        this.isLoading = false;
        // console.log("data offers " + this.offers);
      });
    } else {
      this.offerService
      .getEmployerOffers()
      .subscribe( response => {
        this.response = response
        this.offers = this.response?.data.data;
        this.isLoading = false;
        // console.log("data offers " + this.offers);
      });
    }
  }

  onPageChange(number: number) {
    this.logEvent(`pageChange(${number})`);
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
      this.logEvent(`pageBoundsCorrection(${number})`);
      this.config.currentPage = number;
  }

  pushItem() {
      let item = this.popped?.pop() // || 'A newly-created offer!';
      this.offers?.push();
  }

  popItem() {
      this.popped?.push(this.offers?.pop());
  }

  private logEvent(message: string) {
      this.eventLog.unshift(`${new Date().toISOString()}: ${message}`)
  }



}
