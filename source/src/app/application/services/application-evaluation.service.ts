import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApplicationEvaluationService {
  private apiURL = environment.apiURL + '/application-evaluation/';

  constructor(private http: HttpClient) {}

  addEvaluation(evaluationData: any): Observable<any> {
    return this.http.post(this.apiURL, evaluationData);
  }

  updateEvaluation(id: number, evaluationData: any): Observable<any> {
    return this.http.put(`${this.apiURL}${id}`, evaluationData);
  }

  getEvaluation(applicationId: number): Observable<any> {
    return this.http.get(`${this.apiURL}${applicationId}`);
  }
}
