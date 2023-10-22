import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MobilityType } from 'src/app/shared/enums/mobility-type';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Document } from '../../models/document';
import { DocumentsUploadService } from '../../services/documents-upload.service';
import { DocumentTypesService } from '../../services/document-types.service';
import { UploadedDocument } from '../../models/uploaded-documents';
import { AccountService } from 'src/app/shared/services/account.service';
import { Toast } from 'bootstrap';
import { Application } from 'src/app/application/models/application';
import { shouldDisableForm } from 'src/app/shared/helpers/disabled-form';
import { routeCheck } from 'src/app/shared/helpers/route-checker';

@Component({
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.scss']
})
export class DocumentsUploadComponent implements OnInit {

  formInfo: any;
  applicationId: number | undefined;
  application: Application | undefined = undefined;
  mobilityType: MobilityType | undefined = undefined;
  mTypes = MobilityType;
  uploadedDocuments: (UploadedDocument | undefined)[] = [];
  isApplicationSubmitted:boolean = false;

  // @ViewChild('toastElement', { static: true })
  // toastEl!: ElementRef;

  documents: Document[] = [];

  isAdmin: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private documentsUploadService: DocumentsUploadService,
    private documentTypesService: DocumentTypesService,
    private accountService: AccountService,
    private toastService: ToastService) { }

  ngOnInit(): void {

    this.applicationId = routeCheck(this.route);
    if (!this.applicationId) this.router.navigate(['not-found']);

    this.formInfo = this.route.snapshot.data['form_info'];
    this.isAdmin = this.accountService.isAdmin();

    //new Toast(this.toastEl.nativeElement).show();

    this.getDocumentTypes();
  }

  getDocumentTypes() {
    this.documentTypesService.getByMobilityType(this.applicationId!).subscribe(
      {
        next: (result) => {
          if (result.success) {
            this.documents = result.data.document_types;
            this.application = result.data.application;

            if (this.application)
              this.isApplicationSubmitted = shouldDisableForm(this.application, this.isAdmin, this.formInfo.id)

            this.documents.forEach(d => {
              this.uploadedDocuments.push(undefined);
            });

            this.getUploadedDocuments();
          }
          else {
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    );
  }

  getUploadedDocuments() {
    this.documentsUploadService.getByApplicationId(this.applicationId!).subscribe(
      {
        next: (result) => {

          if (result.success) {

            result.data.forEach(uploaded_doc => {
              const index = this.documents.findIndex(doc => doc.id === uploaded_doc.document_type_id);
              this.uploadedDocuments[index] = uploaded_doc;
            });
          }
          else {
            //this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }

  uploadDocument(form: FormGroup) {

    let request = form.value;
    request.application_id = this.applicationId;

    this.documentsUploadService.createOrUpdate(request).subscribe(
      {
        next: (result) => {
          if (result.success) {
            const updatedDocument = result.data;
            const index = this.documents.findIndex((d => d.id == updatedDocument.document_type_id));
            this.uploadedDocuments[index] = updatedDocument;

            this.toastService.showSuccessToast('Successfully updated documents');
            form.patchValue({
              filename: null,
              file: null
            });
            form.markAsPristine();
          }
          else {
            //console.log(result.errors);
            this.toastService.showErrorsToast(result.errors);
          }
        }
      }
    )
  }

}
