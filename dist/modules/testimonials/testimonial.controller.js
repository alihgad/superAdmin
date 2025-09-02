"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../../middlewares/multer");
const ts = require("./testimonial.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const validator_1 = require("../../middlewares/validator");
const schemas = require("./testimonials.schema");
const testimonialRouter = express_1.default.Router();
// Create testimonial
testimonialRouter.post("/", multer_1.default.single("image"), (0, asyncHandler_1.default)(ts.createTestimonial));
// Update testimonial
testimonialRouter.patch("/:id", multer_1.default.single("image"), (0, asyncHandler_1.default)(ts.updateTestimonial));
// Delete testimonial
testimonialRouter.delete("/:id", (0, validator_1.default)(schemas.deleteTestimonialSchema), (0, asyncHandler_1.default)(ts.deleteTestimonial));
// Get all testimonials
testimonialRouter.get("/", (0, asyncHandler_1.default)(ts.getAllTestimonials));
// Get single testimonial
testimonialRouter.get("/:id", (0, asyncHandler_1.default)(ts.getTestimonialById));
exports.default = testimonialRouter;
//# sourceMappingURL=testimonial.controller.js.map