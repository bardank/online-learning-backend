import { Schema, model } from "mongoose";
import { type User } from "../types/models";
import { ROLES } from "../types/roles";

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: false,
    },
    salt: {
      type: String,
      required: true,
    },
    profilePicture: { type: String, required: false },
    role: {
      type: String,
      default: ROLES.CLIENT,
    },
    accessToken: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema, "users");

export default UserModel;
