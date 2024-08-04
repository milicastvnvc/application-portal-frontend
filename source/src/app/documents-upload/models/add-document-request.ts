export interface AddDocumentRequest {
  application_id: number;
  document_type_id:number;
  file: File;
  document_name: string;
  filename: string;
  link: string;
}
