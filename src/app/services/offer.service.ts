import { JwtHandlerService } from './jwt-handler.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../interfaces/offer';
import { Response } from '../interfaces/response';
import { AddOfferRequest } from '../interfaces/addOfferRequest';
import { AddOfferFieldsLists } from '../interfaces/addOfferFieldsLists';
import { ICity } from '../interfaces/ICity';
import { ResponseMultipleData } from '../interfaces/responseMultiple';
import { IUpdateOffer } from '../interfaces/updateOffer';
import { API_URL } from 'src/config/api.constants';
import { FilterOperation } from '../interfaces/filterOperation';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private headers!:HttpHeaders;
  searchValuesBSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  filterCriteriaObj!:FilterOperation[];

  // employer_id:Number = 2;
  employer_id!:String;


  constructor(private http: HttpClient, private jwtHandlerService:JwtHandlerService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    this.getSearchValsObser().subscribe(val => {
      this.filterCriteriaObj = val
    })
  }

  getOffers(filters:FilterOperation[]) : Observable<Response<Offer[]>>{
    if(filters != null){
      let filter_url = `${API_URL}/offers?`;
      console.log(" url " + filter_url)
      filters.forEach((filter, key, arr) => {
        filter_url += filter.value != null ? `${filter.key}=${filter.value}` : "";
        if (!Object.is(arr.length - 1, key) && filter.value != null && filter.value != "") {
          // execute last item logic
          filter_url += "&";
        }
      })

      if(filter_url.endsWith("&")) filter_url = filter_url.slice(0, -1);

     console.log(" url " + filter_url)
      return this.http
      .get<Response<Offer[]>>(
        filter_url,
        {headers : this.headers}
        );

    }
    console.log(" no filter ")
    return this.http
    .get<Response<Offer[]>>(
      `${API_URL}/offers`,{headers : this.headers}
      );
    }


  getWaitingOffers() : Observable<Response<Offer[]>>{
    return this.http
    .get<Response<Offer[]>>(
      `${API_URL}/offers?status=waiting` ,{headers : this.headers}
      );
    }


  getEmployerOffers() : Observable<Response<Offer[]>>{
    this.employer_id = this.jwtHandlerService.getUserId()!;
    return this.http
    .get<Response<Offer[]>>(
            `${API_URL}/offers?employer=${this.employer_id}`, {headers : this.headers}
            );
    }

  saveOffer(offer: AddOfferRequest) : Observable<Response<Offer>>{
    return this.http
    .post<Response<Offer>>(
            `${API_URL}/offers/add`, offer, {headers : this.headers}
            );
  }

  getAddOfferFields() {
    return this.http
    .get<ResponseMultipleData<AddOfferFieldsLists>>(
      `${API_URL}/offers/fields-options-list` ,{headers : this.headers}
      );
    }

  getCitites() {
    const cities_url = `https://parseapi.back4app.com/classes/List_of_Morroco_cities?limit=300&order=asciiname&keys=asciiname`;

    const headers = new HttpHeaders({
      'X-Parse-Application-Id': '2ZOfB60kP39M5kE4WynRqyP7lNGKZ9MB8fVWqAM9', // This is the fake app's application id
      'X-Parse-Master-Key': 'Qq7lEIoEEzRris3IM6POE5ewvYuzACVyA6VKtiVb', // This is the fake app's readonly master key
    });

    return this.http.get<ICity>(
      cities_url,{headers : headers}
    );
  }

  updateOfferStatus(offer:IUpdateOffer){
    return this.http
    .post<Response<Offer>>(
      `${API_URL}/offers/update-status`, offer, {headers : this.headers}
      );
  }


  forwardSeachValues(newValue:any){
    this.searchValuesBSubject.next(newValue);
  }
  getSearchValsObser(){
    return this.searchValuesBSubject.asObservable();
  }
}

