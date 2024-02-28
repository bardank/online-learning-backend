import Joi from "joi";
import { RegisterPayload } from "../types/auth";

export const RegisterUserBody = Joi.object<RegisterPayload>({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(64).required(),
  password: Joi.string().min(6).max(64).required(),
});
