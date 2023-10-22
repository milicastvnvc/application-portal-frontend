import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UnlockedForm } from '../models/unlocked-form';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnlockedFormsService {

  apiURL = environment.apiURL + '/unlocked-form/';

  constructor(private http: HttpClient) { }

  getUnlockedForm(applicationId: number, formName: string): Observable<BaseResponse<UnlockedForm>> {
    return this.http.get<BaseResponse<UnlockedForm>>(this.apiURL + `${applicationId}/${formName}`);
  }

  toggleLock(applicationId: number, formName: string, shouldUnlock: boolean): Observable<BaseResponse<UnlockedForm>> {
    let body = { application_id: applicationId, form_name: formName, should_unlock: shouldUnlock };
    return this.http.post<BaseResponse<UnlockedForm>>(this.apiURL, body);
  }
}
