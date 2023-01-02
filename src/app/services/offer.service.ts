import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../interfaces/offer';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private getOffers_url = "http://localhost:8080/api/offers";

  jwt =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbXBsb3llcjAxQGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0VNUExPWUVSIiwiZXhwIjoxNjcyNjY3NjQ5LCJpYXQiOjE2NzI2NjQwNDl9.s2wsdamblMY8HcfWSLaloPigQr_Ykhih46rVvclY4JQ";

  constructor(private http: HttpClient) { }

  getOffers(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwt}`
    })
    return this.http.get<Response<Offer[]>>(this.getOffers_url, {headers : headers});
    // return [
    //   {
    //     employerName : "CGI",
    //     title : "JAVA DEVELOPER",
    //     contract: "CDI",
    //     city: "CASA",
    //     date: "12/10/2022"
    //   },
    //   {
    //     employerName : "CGI",
    //     title : "JAVA DEVELOPER",
    //     contract: "CDI",
    //     city: "CASA",
    //     date: "12/10/2022"
    //   },
    //   {
    //     employerName : "CGI",
    //     title : "JAVA DEVELOPER",
    //     contract: "CDI",
    //     city: "CASA",
    //     date: "12/10/2022"
    //   }
    // ]
  }
}
