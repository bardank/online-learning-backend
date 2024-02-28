import { NextFunction, Request, RequestHandler, Response } from "express";
import validators from "../validators";
import { HttpError } from "../libs/httpError";

type Validator = keyof typeof validators;
type RequestPayloadIn = "body" | "query";

const validator =
  (args: Partial<Record<RequestPayloadIn, Validator>>): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keys = Object.keys(args) as RequestPayloadIn[];
      for (const key of keys) {
        const payload = req[key];
        const validator = args[key];
        if (validator) {
          const result = validators[validator].validate(payload);
          if (result.error) {
            return next(
              new HttpError({
                code: 422,
                type: "BAD_REQUEST",
                message:
                  process.env.NODE_ENV === "dev"
                    ? `${result.error.message} in ${key}`
                    : result.error.message,
              })
            );
          }
          if (result.value) {
            req[key] = result.value;
          }
        }
      }
      return next();
    } catch (err) {
      return next(
        new HttpError({
          code: 500,
          type: "INTERNAL_SERVER",
          message: (err as Error).stack,
        })
      );
    }
  };

export default validator;
