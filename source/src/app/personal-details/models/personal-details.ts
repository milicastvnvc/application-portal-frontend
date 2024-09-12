import { BinaryQuestion } from "src/app/shared/enums/binary-question";
import { Gender } from "src/app/shared/enums/gender";

export interface PersonalDetails {
  id: number;
  application_id: number;
  surname: string;
  fornames: string;
  birth_date: Date;
  birth_place: string;
  gender:Gender;
  passport: string;
  street: string;
  postcode: number;
  city: string;
  country: string;
  telephone: string;
  email: string;
  alternative_email: string;
  disadvantaged: BinaryQuestion;
  previous_participation: boolean;
  participation_count?: number;
  name_of_host_institution_1?: string;
  mobility_date_1?: Date;
  name_of_host_institution_2?: string;
  mobility_date_2?: Date;
  name_of_host_institution_3?: string;
  mobility_date_3?: Date;
  name_of_host_institution_4?: string;
  mobility_date_4?: Date;
  name_of_host_institution_5?: string;
  mobility_date_5?: Date;
}
