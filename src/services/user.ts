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

const findOneByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

const userService = {
  create,
  findOneByEmail,
};

export default userService;
