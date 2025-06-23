import { Router } from "express";
import multerUpload from "../../middelWares/multer.js";
import { addImagesToSection, addSection, addToSlider, createSlider, deleteSection, deleteSlider, getAllSections, getAllSlider, getSection, getSlider, removeImageFromSection, updateSection, updateSlider } from "./section.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import auth from "../../middelWares/auth.js";
import validator from "../../middelWares/validator.js";
import { addSectionSchema } from "./section.schema.js";

const sectionRouter = Router();


sectionRouter.post("/slider/:page/:section", auth , multerUpload.single("image"), asyncHandler(createSlider))
sectionRouter.put("/slider/:page/:section", auth , multerUpload.single("image"), asyncHandler(addToSlider))
sectionRouter.put("/slider/:page/:section/:sliderId", auth , multerUpload.single("image"), asyncHandler(updateSlider))
sectionRouter.delete("/slider/:page/:section/:sliderId", auth , asyncHandler(deleteSlider))
sectionRouter.get("/slider/:page", asyncHandler(getAllSlider))
sectionRouter.get("/slider/:page/:section", asyncHandler(getSlider))


sectionRouter.post("/:page/:section", auth , multerUpload.array("images"), validator(addSectionSchema) , asyncHandler(addSection))
sectionRouter.put("/:page/:section", auth , asyncHandler(updateSection))
sectionRouter.put("/images/:page/:section", auth , multerUpload.array("images"), asyncHandler(addImagesToSection))
sectionRouter.delete("/images/:page/:section/:imageId", auth , asyncHandler(removeImageFromSection))
sectionRouter.get("/:page", asyncHandler(getAllSections))
sectionRouter.get("/:page/:section", asyncHandler(getSection))
sectionRouter.delete("/:page/:section", auth , asyncHandler(deleteSection))









export default sectionRouter;