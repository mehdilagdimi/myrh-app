import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private headers!:HttpHeaders;
  private api_url = "http://localhost:8080/api";

  constructor(private http:HttpClient) {
    // this.headers = new HttpHeaders({
    //   'Content-Type':'multipart/form-data'
    // })
  }

  public uploadImage(image: File, offerId:Number) {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(
      `${this.api_url}/images/upload/${offerId}`, formData
      );
  }
}
