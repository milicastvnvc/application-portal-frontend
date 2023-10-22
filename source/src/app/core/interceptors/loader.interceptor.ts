import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.context.get(BYPASS_LOG) === true) {
      return next.handle(request);
    }


    this.loaderService.show();

    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide()),
    );
  }
}
