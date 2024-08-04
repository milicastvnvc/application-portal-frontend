import { ApplicationStatus } from "src/app/shared/enums/application-status";

export const statusConstant = [
  {id: ApplicationStatus.Created, label:'In Progress', color: 'text-info'},
  {id: ApplicationStatus.Pending, label:'Pending', color: 'text-secondary'},
  {id: ApplicationStatus.Completed, label:'Completed', color: 'text-success'},
  {id: ApplicationStatus.Rejected, label:'Rejected', color: 'text-danger'},
  {id: ApplicationStatus.AdditionalDocuments, label:'Additional Documents Required', color: 'text-warning'}
];
