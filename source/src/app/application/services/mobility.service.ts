import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { Mobility } from '../models/mobility';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MobilityService {

  apiURL = environment.apiURL + '/mobility/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseResponse<Mobility[]>> {
    return this.http.get<BaseResponse<Mobility[]>>(this.apiURL);
  }
}
