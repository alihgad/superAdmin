import { Router } from "express";
import {upload} from "../../middelWares/multer.js";
import * as hs from "./help.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import  validate  from "./../../middelWares/validator.js";
import * as schemas from "./help.schema.js";

let helpRouter = Router()

helpRouter.post("/",upload.fields([{ name: "image", maxCount: 1 }, { name: "cover", maxCount: 1 }, { name: "vedio", maxCount: 1 }]), validate(schemas.addArticleSchema) ,asyncHandler(hs.addArticle));
helpRouter.get("/",asyncHandler(hs.getAllArticles));
helpRouter.get("/:id",validate(schemas.getArticleSchema) ,asyncHandler(hs.getArticle));
helpRouter.put("/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "cover", maxCount: 1 }, { name: "vedio", maxCount: 1 }]) ,validate(schemas.updateArticleSchema) ,asyncHandler(hs.updateArticle));
helpRouter.delete("/:id",validate(schemas.deleteArticleSchema) ,asyncHandler(hs.deleteArticle));


export default helpRouter