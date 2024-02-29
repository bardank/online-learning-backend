import { ScopeType, USER } from "../types/scope";

const Scopes: ScopeType = {
  USER: {
    CREATE: USER.CREATE,
    UPDATE: USER.UPDATE,
    DELETE: USER.DELETE,
  },
};


export default Scopes;