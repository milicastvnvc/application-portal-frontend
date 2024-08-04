import { FormProgress } from "src/app/shared/enums/form-progress";

export interface ApplicationProgress {
  application_id: number;
  personal_details: FormProgress;
  home_institution: FormProgress;
  proposed_host_universities: FormProgress;
  motivation_and_added_value: FormProgress;
  documents_upload: FormProgress;
}
