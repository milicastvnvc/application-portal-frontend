import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DocumentsUploadComponent } from './components/documents-upload/documents-upload.component';
import { DocumentRowComponent } from './components/document-row/document-row.component';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';



@NgModule({
  declarations: [
    DocumentsUploadComponent,
    DocumentRowComponent,
    VideoUploadComponent
  ],
  imports: [
    SharedModule
  ]
})
export class DocumentsUploadModule { }
