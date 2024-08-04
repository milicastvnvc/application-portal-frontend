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
    if (createRequest.document_name == videoDocument) {
      return this.uploadVideo(createRequest);
    }
    const formData = new FormData();
    formData.append('file', createRequest.file);
    formData.append('application_id', createRequest.application_id.toString());
    formData.append('document_type_id', createRequest.document_type_id.toString());
    formData.append('document_name', createRequest.document_name);
    formData.append('filename', createRequest.filename);

    return this.http.post<BaseResponse<any>>(this.apiURL, formData);
  }

  uploadVideo(request: AddDocumentRequest): Observable<any> {
    return this.http.post<any>(this.apiURL,
      { application_id: request.application_id,
        document_type_id: request.document_type_id,
        document_name: request.document_name,
        filename: 'video',
        link: request.link
      });
  }

  download(application_id: number, document_name: string, filename: string): Observable<HttpResponse<Blob>> {
    return this.http.get<any>(this.apiURL + `download/${application_id}/${document_name}/${filename}`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }

  downloadAll(application_id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<any>(this.apiURL + `downloadAll/${application_id}`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
}
