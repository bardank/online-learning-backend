import { ScopeList } from "./scope";

export enum ROLES {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  TEACHER = 2,
  STUDENT = 3,
}

export interface Role {
  id: ROLES;
  label: string;
  scopes: ScopeList[];
}
