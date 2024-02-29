import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { AuthToken } from "../types/auth";
import { HttpError } from "../libs/httpError";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authToken = req.headers.authorization
      ?.replace(/^Bearer\s/, "")
      .trim();
    if (!authToken) {
      return next(new HttpError({ code: 401, type: "UNAUTHORIZED" }));
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const { id, isOtpToken = false } = jwt.verify(
      authToken,
      process.env.JWT_SECRET!
    ) as AuthToken ;

    const OTP_EXCLUDED_PATH = ["/new-password"];

    const user = await User.findOne({ _id: id }).select("role organisation");

    if (!user) {
      return next(new HttpError({ code: 401, type: "UNAUTHORIZED" }));
    }
    Object.assign(req, {
      user: {
        id: user._id.toString(),
        role: user.role,
      },
    });
    if (isOtpToken) {
      if (OTP_EXCLUDED_PATH.includes(req.route.path)) {
        return next();
      } else {
        return next(
          new HttpError({
            code: 401,
            type: "UNAUTHORIZED",
            message: "Invalid token use!",
          })
        );
      }
    } else {
      if (OTP_EXCLUDED_PATH.includes(req.route.path)) {
        return next(
          new HttpError({
            code: 401,
            type: "UNAUTHORIZED",
            message: "Invalid token use!",
          })
        );
      }
    }

    next();
  } catch (error) {
    next(new HttpError({ code: 401, type: "UNAUTHORIZED" }));
  }
};
