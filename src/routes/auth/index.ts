import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { catchAsync } from "../../utils/catchAsync";
import authService from "../../services/auth/";
import { type LoginPayload, type RegisterPayload } from "../../types/auth";
import validator from "../../middlewares/validator.middleware";
import verifyTokenMiddleware from "../../middlewares/verifyToken";
import userService from "../../services/user";
const router = Router();

interface LoginRequest extends Request {
  body: LoginPayload;
}

router.post(
  "/login",
  catchAsync(async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    return res.status(200).json({ user });
  })
);

interface RegisterRequest extends Request {
  body: RegisterPayload;
}

router.post(
  "/register",
  validator({ body: "RegisterUserBody" }),
  catchAsync(
    async (req: RegisterRequest, res: Response, next: NextFunction) => {
      const { name, email, password } = req.body;

      const user = await authService.register(name, email, password);
      return res.status(200).json({ user });
    }
  )
);

router.get(
  "/me",
  verifyTokenMiddleware,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.findOneById(req.user!.id);
    return res.status(200).json({ user });
  })
);

export default router;
