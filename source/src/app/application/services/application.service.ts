import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';
import { Application } from '../models/application';
import { CreateApplicationRequest } from '../models/create-application-request';
import { PaginationResult } from 'src/app/shared/models/pagination-result';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  apiURL = environment.apiURL + '/application/';

  constructor(private http: HttpClient) { }

  getAllApplications(page: number = 1, search_key: string = '', mobility_id: number | null = null, home_institution_id: number | null = null, per_page: number = 5, is_submitted: number = 1): Observable<BaseResponse<PaginationResult<Application>>> {
    return this.http.get<BaseResponse<PaginationResult<Application>>>(this.apiURL + `getAll`,
      {
        params:
        {
          page: page,
          per_page: per_page,
          search_key: search_key,
          mobility_id: mobility_id ? mobility_id: '',
          home_institution_id: home_institution_id ? home_institution_id : '',
          is_submitted: is_submitted
        }
      });
  }

  getMyApplicationById(applicationId: number): Observable<BaseResponse<Application>> {
    return this.http.get<BaseResponse<Application>>(this.apiURL + `${applicationId}`);
  }

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiURL);
  }

  createApplication(createApplicationRequest: CreateApplicationRequest): Observable<BaseResponse<Application | undefined>> {
    return this.http.post<BaseResponse<Application | undefined>>(this.apiURL, createApplicationRequest);
  }

  submitApplication(application_id: number): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(this.apiURL + 'submit', { application_id: application_id });
  }
}
