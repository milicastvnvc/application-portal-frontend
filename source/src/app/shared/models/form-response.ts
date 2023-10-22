import { Application } from "src/app/application/models/application";

export interface FormResponse<T> {
  form: T;
  application: Application;
}
