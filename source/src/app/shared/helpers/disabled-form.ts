import { Application } from "src/app/application/models/application";
import { ApplicationStatus } from "../enums/application-status";
import { FormProgress } from "../enums/form-progress";

export function shouldDisableForm(application: Application, isAdmin: boolean, formName: string = ''): boolean {

  if (isAdmin) return true; //admin shouldn't be able to change form

  if (application.status != ApplicationStatus.Created
   && application.status != ApplicationStatus.AdditionalDocuments)
    return true; // applicant shouldn't be able to change form that is already submitted

  if (formName.length) {
    let progress: any = application.progress;
    if (application.status == ApplicationStatus.AdditionalDocuments) // there are unlocked forms for modification
    {
      if (progress[formName] == FormProgress.Unlocked) // if that's the unlocked one, applicant should be able to change it
      {
        return false;
      }
      return true;
    }

  }
  return false;
}
