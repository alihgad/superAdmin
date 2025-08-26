import { Router } from "express";
import * as us from "./user.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middelWares/validator.js";
import * as schemas from "./user.schema.js";
import { auth } from "../../middelWares/auth.js";

let userRouter = Router();

userRouter.post("/login", validate(schemas.loginSchema), asyncHandler(us.loginUser));
userRouter.post("/forgot-password", validate(schemas.forgotPasswordSchema), asyncHandler(us.forgotPassword));
userRouter.post("/reset-password", validate(schemas.resetPasswordSchema), asyncHandler(us.resetPassword));

userRouter.put("/change-password", auth, validate(schemas.changePasswordSchema), asyncHandler(us.changePassword));
userRouter.get("/", auth, asyncHandler(us.getAllUsers));
userRouter.get("/stats", auth, asyncHandler(us.getUserStats));
userRouter.post("/addUser", validate(schemas.createUserSchema), asyncHandler(us.createUser));
userRouter.get("/:id", auth, asyncHandler(us.getUserById));
userRouter.put("/:id", auth, validate(schemas.updateUserSchema), asyncHandler(us.updateUser));
userRouter.delete("/:id", auth, asyncHandler(us.deleteUser));

export default userRouter;
