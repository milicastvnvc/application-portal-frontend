import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requiredFileTypeValidator } from 'src/app/shared/helpers/validators/required-file-format-validator';
import { AddDocumentRequest } from '../../models/add-document-request';
import { DocumentsUploadService } from '../../services/documents-upload.service';
import { Document } from '../../models/document';
import { ToastService } from 'src/app/shared/services/toast.service';
import { completed, fileSize, not_completed, videoDocument, videoSize } from 'src/app/shared/helpers/constants';
import { fileSizeValidator } from 'src/app/shared/helpers/validators/file-size-validator';
import { UploadedDocument } from '../../models/uploaded-documents';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-document-row',
  templateUrl: './document-row.component.html',
  styleUrls: ['./document-row.component.scss']
})
export class DocumentRowComponent implements OnInit {

  @Output()
  uploadEvent = new EventEmitter<FormGroup>();

  @Input()
  document!: Document;

  @Input()
  documentIndex!: number;

  @Input()
  uploadedDocument: UploadedDocument | undefined = undefined;

  @Input()
  isDisabled: boolean = false;

  fileGroup!: FormGroup;

  documentForUpload!: AddDocumentRequest;

  fileFormats: string[] = [];

  completedImage: string = "../../../../assets/" + completed;
  notCompletedImage: string = "../../../../assets/" + not_completed;

  fileSize: number = fileSize;
  videoSize: number = videoSize;

  @Input()
  isAdmin: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private documentsUploadService: DocumentsUploadService,
    private toastService: ToastService) { }

  ngOnInit(): void {

    this.fileGroup = this.formBuilder.group({
      application_id: [''],
      document_type_id: [''],
      file: ['', [Validators.required]],
      filename: ['', [Validators.required]],
      document_name: ['', [Validators.required]]
    });

    if (this.document) {
      if (this.document.links.length > 0) {

        this.document.links.forEach(link => {

          if (!link.link.startsWith("http"))
          {
            link.link = environment.serverURL + link.link;
          }
          this.document.description = this.document.description.replace(link.label, `<a href='${link.link}' target='_blank'>${link.label}</a>`);
        });
      }

      this.fileFormats = this.document.file_formats.split("|");

      this.fileGroup.patchValue({
        document_name: this.document.name,
        document_type_id: this.document.id
      });
      if (this.isDisabled) {
        this.fileGroup.disable();
      }

    }
  }

  get f() { return this.fileGroup.controls; }

  onFileChange(event: any): void {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      if (!fileSizeValidator(file.size, this.document.name)) {
        this.fileGroup.patchValue({
          filename: null,
          file: null
        });

        if (this.document.name == videoDocument)
          this.f['filename'].setErrors({ videoSize: true });
        else
          this.f['filename'].setErrors({ fileSize: true });
        return;
      }

      if (!requiredFileTypeValidator(this.fileFormats, file.name)) {
        this.fileGroup.patchValue({
          filename: null,
          file: null
        });
        this.f['filename'].setErrors({ invalidFileFormat: true });
        return;
      }

      this.fileGroup.patchValue({
        file: file
      });

      this.f['filename'].setErrors(null);
    }
  }

  uploadDocument(): void {
    if (this.fileGroup.invalid) {
      return;
    }

    this.uploadEvent.emit(this.fileGroup);
  }

  downloadDocument(documentIndex:number): void {

    const filename = this.uploadedDocument!.filename;

    this.documentsUploadService.download(this.uploadedDocument!.application_id, this.document.name, filename).subscribe(
      {
        next: (result) => {
          let data = result.body;

          if (data) {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const objectUrl = window.URL.createObjectURL(data);
            a.href = objectUrl;
            a.download = documentIndex + '. ' + this.document.name + ' - ' + filename;//ovde dodaj indeks
            a.click();
            window.URL.revokeObjectURL(objectUrl);
            document.body.removeChild(a);
          }
          else {
            this.toastService.showErrorsToast(['There was an error from server.']);
          }
        }
      }
    )
  }
}
