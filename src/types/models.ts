import { type ObjectId } from "mongoose";
import { type INSTITUTION_TYPE } from "./institutionType";
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

export interface AffiliatedBy {
  label: string;
  link: string;
}
export interface Institution {
  _id: ObjectId;
  name: string;
  slug: string;
  address: string;
  phone: string[];
  ownership: string;
  established: string;
  email: string;
  programs: string[];
  website: string;
  affiliatedBy: AffiliatedBy[];
  logo: string;
  about: string;
  location: string;
  institutionType: INSTITUTION_TYPE;
}
