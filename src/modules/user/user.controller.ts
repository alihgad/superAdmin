import { Router } from "express";
import * as us from "./user.service";
import asyncHandler from "../../utils/asyncHandler";
import validate from "../../middlewares/validator";
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "./user.schema";
import { auth } from "../../middlewares/auth";

let userRouter = Router();

userRouter.post("/login", validate(loginSchema), asyncHandler(us.loginUser));
userRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  asyncHandler(us.forgotPassword)
);
userRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncHandler(us.resetPassword)
);

userRouter.put(
  "/change-password",
  auth,
  validate(changePasswordSchema),
  asyncHandler(us.changePassword)
);
userRouter.get("/", auth, asyncHandler(us.getAllUsers));
userRouter.get("/stats", auth, asyncHandler(us.getUserStats));
userRouter.post(
  "/addUser",
  auth,
  validate(createUserSchema),
  asyncHandler(us.createUser)
);
userRouter.get("/:id", auth, asyncHandler(us.getUserById));
userRouter.put(
  "/:id",
  auth,
  validate(updateUserSchema),
  asyncHandler(us.updateUser)
);
userRouter.delete("/:id", auth, asyncHandler(us.deleteUser));

export default userRouter;
