import { HttpClient } from '@angular/common/http';
import { Call } from '../models/call';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  apiURL = environment.apiURL + '/calls';

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseResponse<Call[]>> {
    return this.http.get<BaseResponse<Call[]>>(this.apiURL);
  }
}
