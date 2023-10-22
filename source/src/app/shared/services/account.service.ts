import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { StorageService } from './storage.service';
import { User } from 'src/app/auth/models/user-response';
import { Role } from '../enums/role';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userKey: string = environment.userKey;

  constructor(private storageService: StorageService) { }

  getUserData(): User | undefined {
    const userData = this.storageService.get(this.userKey);
    if (userData) {
      return JSON.parse(userData);
    }
    return undefined;
  }

  setUserData(userData: User): void {
    this.storageService.set(this.userKey, JSON.stringify(userData));
  }

  getRoles(): Role[] | undefined {
    const userData = this.getUserData();
    if (userData) {
      return userData.roles;
    }
    return undefined;
  }

  isAdmin(): boolean {
    const userData = this.getUserData();
    if (userData) {
      if (userData.roles.includes(Role.Admin))
        return true;
    }
    return false;
  }
}
