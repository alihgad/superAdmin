import { Router } from "express";
import * as us from "./user.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middelWares/validator.js";
import * as schemas from "./user.schema.js";
import { auth } from "../../middelWares/auth.js";

let userRouter = Router();

userRouter.post("/login", asyncHandler(us.loginUser));
userRouter.post("/forgot-password", asyncHandler(us.forgotPassword));
userRouter.post("/reset-password", asyncHandler(us.resetPassword));

userRouter.put("/change-password", auth, asyncHandler(us.changePassword));
userRouter.get("/", auth, asyncHandler(us.getAllUsers));
userRouter.get("/stats", auth, asyncHandler(us.getUserStats));
userRouter.post("/addUser", asyncHandler(us.createUser));
userRouter.get("/:id", auth, asyncHandler(us.getUserById));
userRouter.put("/:id", auth, asyncHandler(us.updateUser));
userRouter.delete("/:id", auth, asyncHandler(us.deleteUser));

export default userRouter;
