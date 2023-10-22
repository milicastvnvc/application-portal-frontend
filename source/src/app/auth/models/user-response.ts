import { Role } from "src/app/shared/enums/role";

export interface User {
  id: number;
  email: string;
  email_verified_at?:Date;
  roles: Role[];
}
