import { Router } from "express";
import { upload } from "../../middelWares/multer.js";
import * as bs from "./blog.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "./../../middelWares/validator.js";
import * as schemas from "./blog.schema.js";

let blogRouter = Router();

blogRouter.post("/", upload.fields([{ name: "image", maxCount: 1 }]), validate(schemas.addBlogSchema), asyncHandler(bs.addBlog));
blogRouter.get("/", asyncHandler(bs.getAllBlogs));
blogRouter.get("/:id", validate(schemas.getBlogSchema), asyncHandler(bs.getBlog));
blogRouter.put("/:blogId/section/:sectionId", validate(schemas.updateBlogSectionSchema), asyncHandler(bs.updateBlogSection));
blogRouter.put("/:id", upload.fields([{ name: "image", maxCount: 1 }]), validate(schemas.updateBlogSchema), asyncHandler(bs.updateBlog));
blogRouter.delete("/:id", validate(schemas.deleteBlogSchema), asyncHandler(bs.deleteBlog));

export default blogRouter;
