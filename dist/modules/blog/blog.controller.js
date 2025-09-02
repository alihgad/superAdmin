"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../../middlewares/multer");
const bs = require("./blog.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const validator_1 = require("./../../middlewares/validator");
const schemas = require("./blog.schema");
let blogRouter = (0, express_1.Router)();
blogRouter.post("/", multer_1.upload.fields([{ name: "image", maxCount: 1 }]), (0, validator_1.default)(schemas.addBlogSchema), (0, asyncHandler_1.default)(bs.addBlog));
blogRouter.get("/", (0, asyncHandler_1.default)(bs.getAllBlogs));
blogRouter.get("/:id", (0, validator_1.default)(schemas.getBlogSchema), (0, asyncHandler_1.default)(bs.getBlog));
blogRouter.put("/:blogId/section/:sectionId", multer_1.upload.single("image"), (0, validator_1.default)(schemas.updateBlogSectionSchema), (0, asyncHandler_1.default)(bs.updateBlogSection));
blogRouter.post("/:blogId/section", multer_1.upload.single("image"), (0, validator_1.default)(schemas.addBlogSectionSchema), (0, asyncHandler_1.default)(bs.addBlogSection));
blogRouter.put("/:id", multer_1.upload.single("image"), (0, validator_1.default)(schemas.updateBlogSchema), (0, asyncHandler_1.default)(bs.updateBlog));
blogRouter.delete("/:id", (0, validator_1.default)(schemas.deleteBlogSchema), (0, asyncHandler_1.default)(bs.deleteBlog));
blogRouter.delete("/:id/section/:sectionId", (0, validator_1.default)(schemas.deleteBlogSectionSchema), (0, asyncHandler_1.default)(bs.deleteBlogSection));
exports.default = blogRouter;
//# sourceMappingURL=blog.controller.js.map