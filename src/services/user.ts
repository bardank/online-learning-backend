import UserModel from "../models/user";
import type { User } from "../types/models";

const create = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const user = await UserModel.create({
    name,
    email,
    password,
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
