import { Router } from "express";
import { addUser, login, updateUser , updatePassword} from "./users.service.js";
import asyncHandler from "../../middelWares/asyncHandler.js";
import auth from "../../middelWares/auth.js";

const userRouter = Router();

userRouter.post("/", asyncHandler(addUser))
userRouter.post("/login", asyncHandler(login))
userRouter.put("/:id", auth , asyncHandler(updateUser))  
userRouter.put("/:id/password", auth , asyncHandler(updatePassword))  






export default userRouter;