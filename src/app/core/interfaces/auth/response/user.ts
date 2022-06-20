import { Role } from './role';

export interface User {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  photoUrl: string;
  enabled: boolean;
  phoneNumber: string;
  shopId: string;
  roles: Role[];
}
