import { Schema, model } from "mongoose";
import { type User } from "../types/models";
import { ROLES, Role } from "../types/roles";
import Roles from "../configs/roles";

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: false,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
    profilePicture: { type: String, required: false },
    role: {
      type: Number,
      default: 3,
      get: getRole,
    } as unknown as Role,
    accessToken: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

function getRole(roleId: number): Role {
  return Roles.getRole(roleId);
}

export const UserModel = model("User", UserSchema, "users");

export default UserModel;
