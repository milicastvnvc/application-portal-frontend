import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { session_expired_message } from 'src/app/shared/helpers/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
    private storageService: StorageService,
    private router: Router,
    private toastService: ToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const isValidToken = !this.tokenService.isTokenExpired();
    const isApiUrl = request.url.startsWith(environment.apiURL);

    if (isValidToken && isApiUrl) {
      const token = this.tokenService.getToken();
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        this.storageService.clear();
        this.toastService.showWarningToast(session_expired_message);
        this.router.navigate(['login']);
      }

      if (error.status == 403) {
        this.router.navigate(['forbidden']);
      }

      return throwError(() => error);;
    }));
  }
}
