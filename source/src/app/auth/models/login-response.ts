import { User } from "./user-response";

export interface LoginResponse {
  user: User;
  token: string;
}
