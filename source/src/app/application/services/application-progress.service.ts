import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';
import { ApplicationProgress } from '../models/application-progress';
import { FormProgress } from 'src/app/shared/enums/form-progress';

@Injectable({
  providedIn: 'root'
})
export class ApplicationProgressService {

  apiURL = environment.apiURL + '/application-progress/';

  constructor(private http: HttpClient) { }

  getByApplicationId(applicationId: number): Observable<BaseResponse<ApplicationProgress>> {
    return this.http.get<BaseResponse<ApplicationProgress>>(this.apiURL + `${applicationId}`);
  }

  toggleLock(applicationId: number, formName: string, shouldUnlock: boolean): Observable<BaseResponse<FormProgress>> {
    let body = { application_id: applicationId, form_name: formName, should_unlock: shouldUnlock };
    return this.http.post<BaseResponse<FormProgress>>(this.apiURL, body);
  }
}
