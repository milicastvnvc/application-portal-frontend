import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { MotivationAndAddedValue } from '../models/motivation-and-added-value';
import { environment } from 'src/environments/environment.development';
import { FormResponse } from 'src/app/shared/models/form-response';

@Injectable({
  providedIn: 'root'
})
export class MotivationAndAddedValueService {

  apiURL = environment.apiURL + '/motivation-and-added-value/';

  constructor(private http: HttpClient) { }

  getByApplicationId(applicationId: number): Observable<BaseResponse<FormResponse<MotivationAndAddedValue>>> {
    return this.http.get<BaseResponse<FormResponse<MotivationAndAddedValue>>>(this.apiURL + `${applicationId}`);
  }

  createOrUpdate(createRequest: MotivationAndAddedValue): Observable<BaseResponse<MotivationAndAddedValue | undefined>> {
    return this.http.post<BaseResponse<MotivationAndAddedValue | undefined>>(this.apiURL, createRequest);
  }
}
