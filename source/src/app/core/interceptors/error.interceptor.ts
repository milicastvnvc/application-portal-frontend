import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { server_error_message } from 'src/app/shared/helpers/constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastService: ToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) { // client-side error
            return throwError(() => error);
          }
          else { // server-side error

            if (error.status == HttpStatusCode.NotFound)
            {
              this.router.navigate(['not-found']);
              return throwError(() => error);
            }

            if (error.status == HttpStatusCode.Unauthorized)
            {
              return throwError(() => error); //Obradice ga AuthInterceptor
            }

            this.toastService.showErrorsToast([server_error_message]);
          }

          return throwError(() => new Error(server_error_message));
        })
      );
  }
}
