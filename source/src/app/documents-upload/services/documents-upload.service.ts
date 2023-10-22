import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment.development';
import { UploadedDocument } from '../models/uploaded-documents';
import { AddDocumentRequest } from '../models/add-document-request';
import { videoDocument } from 'src/app/shared/helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class DocumentsUploadService {

  apiURL = environment.apiURL + '/documents-upload/';

  constructor(private http: HttpClient) { }

  getByApplicationId(applicationId: number): Observable<BaseResponse<UploadedDocument[]>> {
    return this.http.get<BaseResponse<UploadedDocument[]>>(this.apiURL + `${applicationId}`);
  }

  createOrUpdate(createRequest: AddDocumentRequest): Observable<BaseResponse<any>> {
    const formData = new FormData();
    formData.append('file', createRequest.file);
    formData.append('application_id', createRequest.application_id.toString());
    formData.append('document_type_id', createRequest.document_type_id.toString());
    formData.append('document_name', createRequest.document_name);
    formData.append('filename', createRequest.filename);
    if (createRequest.document_name == videoDocument) {
      return this.uploadVideo(formData);
    }
    else return this.http.post<BaseResponse<any>>(this.apiURL, formData);
  }

  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiURL,
      formData);
      //{ context: new HttpContext().set(BYPASS_LOG, true), reportProgress: true, observe: 'events' } ) //
      // .pipe(
      //   map((event: any) => {
      //     if (event.type == HttpEventType.UploadProgress) {
      //       const progress = event.progress;
      //       console.log("Uploaded", progress);
      //     } else if (event.type == HttpEventType.Response) {
      //       console.log('File upload complete.');
      //     }
      //   }),
      //   catchError((err: any) => {
      //     alert(err.message);
      //     return throwError(() => err.message);
      //   })
      // );
  }

  download(application_id: number, document_name: string, filename: string): Observable<HttpResponse<Blob>> {
    return this.http.get<any>(this.apiURL + `download/${application_id}/${document_name}/${filename}`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
}
