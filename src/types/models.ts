import { type ObjectId } from "mongoose";
import { type Role } from "./roles";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  salt: string;
  role: Role;
  profilePicture: string;
  accessToken: string;
}

