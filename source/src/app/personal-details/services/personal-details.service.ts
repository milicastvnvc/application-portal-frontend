import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';
import { PersonalDetails } from '../models/personal-details';
import { FormResponse } from 'src/app/shared/models/form-response';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  apiURL = environment.apiURL + '/personal-details/';

  constructor(private http: HttpClient) { }

  getByApplicationId(applicationId: number): Observable<BaseResponse<FormResponse<PersonalDetails>>> {
    return this.http.get<BaseResponse<FormResponse<PersonalDetails>>>(this.apiURL + `${applicationId}`);
  }

  createOrUpdate(createRequest: PersonalDetails): Observable<BaseResponse<PersonalDetails | undefined>> {
    return this.http.post<BaseResponse<PersonalDetails | undefined>>(this.apiURL, createRequest);
  }
}
