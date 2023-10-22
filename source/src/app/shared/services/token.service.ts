import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { StorageService } from './storage.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenKey: string = environment.tokenKey;

  constructor(private storageService: StorageService) { }

  setToken(token: string): void {
    this.storageService.set(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.storageService.get(this.tokenKey);
  }

  removeToken(): void {
    this.storageService.remove(this.tokenKey);
  }

  getDecodeToken(token: string): { [key: string]: string } {
    return jwtDecode(token);
  }

  getExpiryTime(token: string): string | null {
    let decodedToken = this.getDecodeToken(token);
    return decodedToken ? decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      let expiryTime = this.getExpiryTime(token);
      if (expiryTime) {
        const expiryNumber = Number(expiryTime);
        return ((1000 * expiryNumber) - (new Date()).getTime()) < 5000;
      }

      return true;
    }

    return true;
  }
}
