import { Router } from "express";
import {upload} from "../../middelWares/multer.js";
import { addArticle, deleteArticle, getAllArticles, getArticle, updateArticle, updateImage, updateVedio } from "./help.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import  validate  from "./../../middelWares/validator.js";
import { updateArticleSchema } from "./help.schema.js";

let helpRouter = Router()

helpRouter.post("/",upload.fields([{ name: "image", maxCount: 1 }, { name: "vedio", maxCount: 1 }]),asyncHandler(addArticle));
helpRouter.get("/",asyncHandler(getAllArticles));
helpRouter.get("/:articleName",asyncHandler(getArticle));
helpRouter.put("/:articleName", validate(updateArticleSchema) ,asyncHandler(updateArticle));
helpRouter.patch("/updateImage/:articleName",upload.single("image"),asyncHandler(updateImage));
helpRouter.patch("/updateVedio/:articleName",upload.single("vedio"),asyncHandler(updateVedio));
helpRouter.delete("/:articleName",asyncHandler(deleteArticle));


export default helpRouter