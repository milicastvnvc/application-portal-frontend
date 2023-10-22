import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';
import { ProposedHostUniversities } from '../models/proposed-host-universities';
import { ProposedHostUniversitiesResponse } from '../models/proposed-host-universities-response';

@Injectable({
  providedIn: 'root'
})
export class ProposedHostUniversititesService {
  apiURL = environment.apiURL + '/proposed-host-universities/';

  constructor(private http: HttpClient) { }

  getByApplicationId(applicationId: number): Observable<BaseResponse<ProposedHostUniversitiesResponse>> {
    return this.http.get<BaseResponse<ProposedHostUniversitiesResponse>>(this.apiURL + `${applicationId}`);
  }

  createOrUpdate(createRequest: ProposedHostUniversities): Observable<BaseResponse<ProposedHostUniversities | undefined>> {
    return this.http.post<BaseResponse<ProposedHostUniversities | undefined>>(this.apiURL, createRequest);
  }
}
