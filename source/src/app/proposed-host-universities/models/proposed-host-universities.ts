import { Semester } from "src/app/shared/models/semester";

export interface ProposedHostUniversities {
  id: number;
  application_id: number;
  host_institution: string;
  department: string;
  host_institution_second: string;
  department_second: string;
  semester_id: number;
  semester: Semester;
}
