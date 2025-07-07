import { Router } from "express";
import multerUpload from "../../middelWares/multer.js";
import * as ss from "./section.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validator from "../../middelWares/validator.js";
import * as schemas from "./section.schema.js";

const sectionRouter = Router();


sectionRouter.post("/slider/:page/:section", multerUpload.single("image"), validator(schemas.createSliderSchema) , asyncHandler(ss.createSlider))
sectionRouter.put("/updateSlider/:sliderId",multerUpload.single("image") ,asyncHandler(ss.updateSlider))
sectionRouter.put("/slider/:sliderId", multerUpload.single("image"), validator(schemas.createSliderSchema) , asyncHandler(ss.addToSlider))
sectionRouter.patch("/slider/:page/:section/:slideId", multerUpload.single("image"), validator(schemas.createSliderSchema) , asyncHandler(ss.updateSlide))
sectionRouter.delete("/slider/:sliderId", asyncHandler(ss.deleteSlider))
sectionRouter.delete("/slider/:page/:section/:slideId", asyncHandler(ss.deleteSlide))
sectionRouter.get("/slider/:page", asyncHandler(ss.getAllSlider))
sectionRouter.get("/slider/:page/:section", asyncHandler(ss.getSlider))


sectionRouter.post("/:page/:section", multerUpload.array("images"), validator(schemas.addSectionSchema) , asyncHandler(ss.addSection))
sectionRouter.put("/:page/:section" , multerUpload.array("images") ,asyncHandler(ss.updateSection))
sectionRouter.put("/images/:page/:section", multerUpload.array("images"), asyncHandler(ss.addImagesToSection))
sectionRouter.delete("/images/:page/:section/:imageId", asyncHandler(ss.removeImageFromSection))
sectionRouter.get("/:page", asyncHandler(ss.getAllSections))
sectionRouter.get("/:page/:section", asyncHandler(ss.getSection))
sectionRouter.delete("/:page/:section", asyncHandler(ss.deleteSection))









export default sectionRouter;
