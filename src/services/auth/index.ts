import  { HttpError } from "../../libs/httpError";
import type { HttpErrorPayload } from "../../types/error";
import { type User } from "../../types/models";
import { comparePassword, encryptPassword, generateSalt } from "../bcrypt";
import getToken from "../jwt";
import userService from "../user";

const login = async (email: string, password: string): Promise<User> => {
  const errObj: HttpErrorPayload = {
    code: 400,
    type: "BAD_REQUEST",
    message: "Invalid credentials!",
  };
  const user = await userService.findOneByEmail(email);
  if (!user) {
    throw new HttpError({
      code: 403,
      type: "UNAUTHORIZED",
      message: "User not found!",
    });
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new HttpError(errObj);
  }
  user.password = "";
  return user;
};

const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const validatedUser = await userService.findOneByEmail(email);
  if (validatedUser) {
    throw new HttpError({
      code: 400,
      type: "BAD_REQUEST",
      message: "User already exists!",
    });
  }

  name = name
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");

  const salt = await generateSalt();
  password = await encryptPassword(password, salt);

  const user = await userService.create(name, email, password);

  const accessToken = getToken(user._id as unknown as string, user.email);
  user.accessToken = accessToken;
  user.password = "";
  return user;
};

const authService = {
  login,
  register,
};

export default authService;
