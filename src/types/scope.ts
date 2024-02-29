export enum USER {
  CREATE = "user.create",
  UPDATE = "user.update",
  DELETE = "user.delete",
}
export type ScopeList = `${USER}`;



export interface ScopeType {
  USER: {
    CREATE: USER.CREATE;
    UPDATE: USER.UPDATE;
    DELETE: USER.DELETE;
  };
}