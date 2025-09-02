import { Router } from "express";
import upload from "../../middlewares/multer";
import * as ss from "./section.service";
import asyncHandler from "../../utils/asyncHandler";
import validator from "../../middlewares/validator";
import * as schemas from "./section.schema";

const sectionRouter = Router();


sectionRouter.post("/slider/:page/:section", upload.single("image"), validator(schemas.createSliderSchema) , asyncHandler(ss.createSlider))
sectionRouter.put("/updateslider/:sliderId", upload.single("image"), asyncHandler(ss.updateSlider))
sectionRouter.put("/slider/addtoslider/:sliderId", upload.single("image"), validator(schemas.createSliderSchema) , asyncHandler(ss.addToSlider))
sectionRouter.patch("/slider/updateoneslide/:page/:section/:slideId", upload.single("image") , asyncHandler(ss.updateSlide))
sectionRouter.delete("/slider/:sliderId", asyncHandler(ss.deleteSlider))
sectionRouter.delete("/slider/:page/:section/:slideId", asyncHandler(ss.deleteSlide))
sectionRouter.get("/slider/:page", asyncHandler(ss.getAllSlider))
sectionRouter.get("/slider/:page/:section", asyncHandler(ss.getSlider))



sectionRouter.post("/:page/:section", upload.array("images"), validator(schemas.addSectionSchema) , asyncHandler(ss.addSection))
sectionRouter.put("/:page/:section" , upload.array("images") ,asyncHandler(ss.updateSection))
sectionRouter.put("/images/:page/:section", upload.array("images"), asyncHandler(ss.addImagesToSection))
sectionRouter.delete("/images/:page/:section/:imageId", asyncHandler(ss.removeImageFromSection))
sectionRouter.get("/:page", asyncHandler(ss.getAllSections))
sectionRouter.get("/:page/:section", asyncHandler(ss.getSection))
sectionRouter.delete("/:page/:section", asyncHandler(ss.deleteSection))









export default sectionRouter;
