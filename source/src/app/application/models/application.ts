import { User } from "src/app/auth/models/user-response";
import { ApplicationProgress } from "./application-progress";
import { HomeInstitution } from "./home-institution";
import { Mobility } from "./mobility";
import { OtherMobility } from "./other-mobility";
import { ApplicationStatus } from "src/app/shared/enums/application-status";

export interface Application {
  id: number;
  user_id: number;
  user: User;
  mobility_id: number;
  mobility: Mobility;
  other_mobility: OtherMobility;
  home_institution_id: number;
  home_institution: HomeInstitution;
  progress: ApplicationProgress;
  status: ApplicationStatus;
  score: number;
  call_id: number;
  unlocked_forms: string[];
  created_at: Date;
  submitted_at?: Date;
}
