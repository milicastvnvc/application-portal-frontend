import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';
import { ApplicationProgress } from '../models/application-progress';

@Injectable({
  providedIn: 'root'
})
export class ApplicationProgressService {

  apiURL = environment.apiURL + '/application-progress/';

  constructor(private http: HttpClient) { }

  getByApplicationId(applicationId: number): Observable<BaseResponse<ApplicationProgress>> {
    return this.http.get<BaseResponse<ApplicationProgress>>(this.apiURL + `${applicationId}`);
  }
}
