import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeInstitution } from 'src/app/application/models/home-institution';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeInstitutionsService {

  apiURL = environment.apiURL + '/home-institutions/';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<BaseResponse<HomeInstitution>> {
    return this.http.get<BaseResponse<HomeInstitution>>(this.apiURL + `${id}`);
  }

  getAll(): Observable<BaseResponse<HomeInstitution[]>> {
    return this.http.get<BaseResponse<HomeInstitution[]>>(this.apiURL);
  }

}
