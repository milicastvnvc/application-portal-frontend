import { Role } from "src/app/shared/enums/role";

export interface User {
  id: number;
  email: string;
  roles: Role[];
}
