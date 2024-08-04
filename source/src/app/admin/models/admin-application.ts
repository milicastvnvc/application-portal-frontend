import { Application } from "src/app/application/models/application";
import { ApplicantDetails } from "./applicant-details";

export interface AdminApplication extends Application
{
  personal_details: ApplicantDetails;
}
