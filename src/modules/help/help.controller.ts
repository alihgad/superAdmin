import { Router } from "express";
import {upload} from "../../middlewares/multer";
import * as hs from "./help.service";
import asyncHandler from "../../utils/asyncHandler";
import  validate  from "./../../middlewares/validator";
import * as schemas from "./help.schema";

let helpRouter = Router()

helpRouter.post("/",upload.fields([{ name: "image", maxCount: 1 }, { name: "cover", maxCount: 1 }, { name: "vedio", maxCount: 1 }]), validate(schemas.addArticleSchema) ,asyncHandler(hs.addArticle));
helpRouter.get("/",asyncHandler(hs.getAllArticles));
helpRouter.get("/:id",validate(schemas.getArticleSchema) ,asyncHandler(hs.getArticle));
helpRouter.put("/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "cover", maxCount: 1 }, { name: "vedio", maxCount: 1 }]) ,validate(schemas.updateArticleSchema) ,asyncHandler(hs.updateArticle));
helpRouter.delete("/:id",validate(schemas.deleteArticleSchema) ,asyncHandler(hs.deleteArticle));


export default helpRouter