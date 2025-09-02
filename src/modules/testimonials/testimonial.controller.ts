import express from "express";
import multerUpload from "../../middlewares/multer";
import * as ts from "./testimonial.service";
import asyncHandler from "../../utils/asyncHandler";
import validator from "../../middlewares/validator";
import * as schemas from "./testimonials.schema";

const testimonialRouter = express.Router();

// Create testimonial
testimonialRouter.post(
  "/",
  multerUpload.single("image"),
  asyncHandler(ts.createTestimonial)
);
// Update testimonial
testimonialRouter.patch(
  "/:id",
  multerUpload.single("image"),
  asyncHandler(ts.updateTestimonial)
);
// Delete testimonial
testimonialRouter.delete(
  "/:id",
  validator(schemas.deleteTestimonialSchema),
  asyncHandler(ts.deleteTestimonial)
);
// Get all testimonials
testimonialRouter.get("/", asyncHandler(ts.getAllTestimonials));
// Get single testimonial
testimonialRouter.get("/:id", asyncHandler(ts.getTestimonialById));

export default testimonialRouter;
