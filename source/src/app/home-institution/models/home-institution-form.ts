export interface HomeInstitutionForm {
  id: number;
  application_id:number;
  faculty: string;
  department: string;
  current_grade: number | undefined;
  previous_gpa: number | undefined;
  study_program: string;
  responsible_person: string;
  email_responsible_person: string;
  other_contact: string;
}
