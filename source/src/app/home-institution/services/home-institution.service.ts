import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { HomeInstitutionForm } from '../models/home-institution-form';
import { environment } from 'src/environments/environment.development';
import { FormResponse } from 'src/app/shared/models/form-response';

@Injectable({
  providedIn: 'root'
})
export class HomeInstitutionService {

  apiURL = environment.apiURL + '/home-institution/';

  constructor(private http: HttpClient) { }

  getByApplicationId(applicationId: number): Observable<BaseResponse<FormResponse<HomeInstitutionForm>>> {
    return this.http.get<BaseResponse<FormResponse<HomeInstitutionForm>>>(this.apiURL + `${applicationId}`);
  }

  createOrUpdate(createRequest: HomeInstitutionForm): Observable<BaseResponse<HomeInstitutionForm | undefined>> {
    return this.http.post<BaseResponse<HomeInstitutionForm | undefined>>(this.apiURL, createRequest);
  }
}
