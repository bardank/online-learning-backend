import { Role } from "../types/roles";
import Scopes from "./scopes";

const ROLES: Role[] = [
  {
    id: 0,
    label: "Super_Admin",
    scopes: [Scopes.USER.CREATE, Scopes.USER.UPDATE, Scopes.USER.DELETE],
  },
  {
    id: 1,
    label: "Admin",
    scopes: [Scopes.USER.CREATE, Scopes.USER.UPDATE, Scopes.USER.DELETE],
  },
  {
    id: 2,
    label: "Teacher",
    scopes: [Scopes.USER.CREATE, Scopes.USER.UPDATE, Scopes.USER.DELETE],
  },
  {
    id: 3,
    label: "Student",
    scopes: [Scopes.USER.CREATE, Scopes.USER.UPDATE, Scopes.USER.DELETE],
  },
];

const Roles = {
  getRole(id: number): Role {
    return ROLES.find((r) => r.id === id)!;
  },
};

export default Roles;
