import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/config/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private headers!:HttpHeaders;

  constructor(private http:HttpClient) {
  }

  public uploadImage(image: File, offerId:Number) {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(
      `${API_URL}/images/upload/${offerId}`, formData
      );
  }
}
