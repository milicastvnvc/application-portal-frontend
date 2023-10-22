import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MobilityType } from 'src/app/shared/enums/mobility-type';
import { environment } from 'src/environments/environment.development';
import { Document } from '../models/document';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  apiURL = environment.apiURL + '/document-types/';

  constructor(private http: HttpClient) { }

  getByMobilityType(application_id: number): Observable<BaseResponse<any>> {
    return this.http.get<BaseResponse<any>>(this.apiURL + `${application_id}`);
  }
}
