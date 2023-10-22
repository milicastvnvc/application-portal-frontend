import { FormResponse } from "src/app/shared/models/form-response";
import { ProposedHostUniversities } from "./proposed-host-universities";
import { Semester } from "src/app/shared/models/semester";

export interface ProposedHostUniversitiesResponse extends FormResponse<ProposedHostUniversities>{
  active_semesters: Semester[];
}
