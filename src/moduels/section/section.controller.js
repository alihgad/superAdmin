import { Router } from "express";
import multerUpload from "../../middelWares/multer.js";
import { addImagesToSection, addSection, addToSlider, createSlider, deleteSection, getAllSections, getSection, removeImageFromSection, updateSection } from "./section.service.js";
import asyncHandler from "../../middelWares/asyncHandler.js";
import auth from "../../middelWares/auth.js";

const sectionRouter = Router();


sectionRouter.post("/:page/:section", auth , multerUpload.array("images"), asyncHandler(addSection))
sectionRouter.put("/:page/:section", auth , asyncHandler(updateSection))
sectionRouter.put("/images/:page/:section", auth , multerUpload.array("images"), asyncHandler(addImagesToSection))
sectionRouter.delete("/images/:page/:section/:imageId", auth , asyncHandler(removeImageFromSection))
sectionRouter.get("/:page", asyncHandler(getAllSections))
sectionRouter.get("/:page/:section", asyncHandler(getSection))
sectionRouter.delete("/:page/:section", auth , asyncHandler(deleteSection))

sectionRouter.post("/slider/:page/:section", auth , multerUpload.single("image"), asyncHandler(createSlider))
sectionRouter.put("/slider/:page/:section", auth , multerUpload.single("image"), asyncHandler(addToSlider))






export default sectionRouter;