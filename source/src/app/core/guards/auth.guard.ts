import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/enums/role';
import { session_expired_message } from 'src/app/shared/helpers/constants';
import { AccountService } from 'src/app/shared/services/account.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService,
    private storageService: StorageService,
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenService.isTokenExpired()) {
      if (this.tokenService.getToken()) this.toastService.showWarningToast(session_expired_message);
      this.storageService.clear();
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data['roles'] as Role[];
    const usersRoles = this.accountService.getRoles();

    if (requiredRoles && usersRoles) {
      if (usersRoles.some((role) => requiredRoles.includes(role))) return true;

      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }

}
