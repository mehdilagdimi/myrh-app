import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerService {

    jwtToken!: string;
    decodedToken!: { [key: string]: string };

    constructor(private storageService:LocalStorageService) {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    decodeToken() {
      if(!this.jwtToken) this.jwtToken = this.storageService.get("myrh-token")!;
      if (this.jwtToken) {
       this.decodedToken = jwt_decode(this.jwtToken);
      }
    }

    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }

    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['sub'] : null;
    }

    getEmail() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['sub'] : null;
    }
    getRole() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['role'] : null;
    }

    getUserId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['userId'] : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['exp'] : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: any = this.getExpiryTime();
      if (expiryTime) {
        // console.log(" inside expired ", (expiryTime * 1000) - (new Date()).getTime())
        return ((expiryTime * 1000) - (new Date()).getTime()) < 500;
      } else {
        return true;
      }
    }
}

