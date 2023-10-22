import { DocumentLinks } from "./document-links";

export interface Document {
  id: number,
  name: string,
  description: string,
  is_required: boolean,
  file_formats: string
  links: DocumentLinks[];
}
