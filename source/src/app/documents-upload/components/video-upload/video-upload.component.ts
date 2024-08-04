import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { completed, not_completed } from 'src/app/shared/helpers/constants';
import { AddDocumentRequest } from '../../models/add-document-request';
import { UploadedDocument } from '../../models/uploaded-documents';
import { Document } from '../../models/document';
import { youtubeUrlValidator } from 'src/app/shared/helpers/validators/youtube-url-validator';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {

  @Output()
  uploadEvent = new EventEmitter<FormGroup>();

  @Input()
  document!: Document;

  @Input()
  uploadedDocument: UploadedDocument | undefined = undefined;

  @Input()
  isDisabled: boolean = false;

  formGroup!: FormGroup;

  documentForUpload!: AddDocumentRequest;

  completedImage: string = "../../../../assets/" + completed;
  notCompletedImage: string = "../../../../assets/" + not_completed;

  @Input()
  isAdmin: boolean = false;

  submitted: boolean = false;

  get f() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      application_id: [''],
      document_type_id: [''],
      document_name: ['', [Validators.required]],
      link: ['', [Validators.required, youtubeUrlValidator()]]
    });

    if (this.document) {
      if (this.document.links.length > 0) {
        this.document.links.forEach(link => {
          this.document.description = this.document.description.replace(link.label, `<a href='${link.link}' target='_blank'>${link.label}</a>`);
        });
      }

      this.formGroup.patchValue({
        document_name: this.document.name,
        document_type_id: this.document.id
      });

      if (this.isDisabled) {
        this.formGroup.disable();
      }

    }
  }

  uploadVideo(): void {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.uploadEvent.emit(this.formGroup);
  }

}
