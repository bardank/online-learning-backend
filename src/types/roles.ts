export enum ROLES {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  GUEST = "GUEST",
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
}

export type Role = `${ROLES}`;
