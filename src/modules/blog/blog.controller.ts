import { Router } from "express";
import { upload } from "../../middlewares/multer";
import * as bs from "./blog.service";
import asyncHandler from "../../utils/asyncHandler";
import validate from "./../../middlewares/validator";
import * as schemas from "./blog.schema";

let blogRouter = Router();

blogRouter.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validate(schemas.addBlogSchema),
  asyncHandler(bs.addBlog)
);
blogRouter.get("/", asyncHandler(bs.getAllBlogs));
blogRouter.get(
  "/:id",
  validate(schemas.getBlogSchema),
  asyncHandler(bs.getBlog)
);
blogRouter.put(
  "/:blogId/section/:sectionId",
  upload.single("image"),
  validate(schemas.updateBlogSectionSchema),
  asyncHandler(bs.updateBlogSection)
);
blogRouter.post(
  "/:blogId/section",
  upload.single("image"),
  validate(schemas.addBlogSectionSchema),
  asyncHandler(bs.addBlogSection)
);
blogRouter.put(
  "/:id",
  upload.single("image"),
  validate(schemas.updateBlogSchema),
  asyncHandler(bs.updateBlog)
);
blogRouter.delete(
  "/:id",
  validate(schemas.deleteBlogSchema),
  asyncHandler(bs.deleteBlog)
);
blogRouter.delete(
  "/:id/section/:sectionId",
  validate(schemas.deleteBlogSectionSchema),
  asyncHandler(bs.deleteBlogSection)
);

export default blogRouter;
