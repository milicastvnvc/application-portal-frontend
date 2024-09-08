import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';
import { Contest } from '../models/contest';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  
  // private apiURL = '/api/contests';
  apiURL = environment.apiURL + '/contests/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseResponse<Contest[]>> {
    return this.http.get<BaseResponse<Contest[]>>(this.apiURL);
  }
}
