import UserModel from "../models/user";
import type { User } from "../types/models";
import { ROLES } from "../types/roles";

const create = async (
  name: string,
  email: string,
  password: string,
  salt: string
): Promise<User> => {
  const user = await UserModel.create({
    name,
    email,
    password,
    salt,
    role: ROLES.STUDENT,
  });
  return user;
};

const Me = async (
  name: string,
  email: string,
  password: string,
  salt: string
): Promise<User> => {
  const user = await UserModel.create({
    name,
    email,
    password,
    salt,
    role: ROLES.STUDENT,
  });
  return user;
};

const findOneByEmail = async (
  email: string,
  showPassword: boolean = false
): Promise<User | null> => {
  //include salt aswell when showPassword is true
  if (showPassword) {
    return (await UserModel.findOne({
      email,
    }).select("+password +salt")) as User | null;
  }
  return await UserModel.findOne({ email });
};

const findOneById = async (id: string): Promise<User | null> => {
  return await UserModel.findOne({ _id: id });
};

const userService = {
  create,
  findOneByEmail,
  findOneById,
};

export default userService;
