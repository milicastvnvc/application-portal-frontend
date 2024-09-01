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
  previous_host_institution: string;
  mobility_dates: Date;
}
