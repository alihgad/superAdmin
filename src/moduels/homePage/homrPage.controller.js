import { Router } from "express";
import multerUpload from "../../middelWares/multer.js";
import { addSection, addToSlider, createSlider, deleteSection, getAllSections, getSection, updateSection } from "./homePage.service.js";
import asyncHandler from "../../middelWares/asyncHandler.js";
import auth from "../../middelWares/auth.js";

const homeRouter = Router();


homeRouter.post("/:section", auth , multerUpload.array("images"), asyncHandler(addSection))
homeRouter.put("/:section", auth , multerUpload.array("images"), asyncHandler(updateSection))
homeRouter.get("/", asyncHandler(getAllSections))
homeRouter.get("/:section", asyncHandler(getSection))
homeRouter.delete("/:section", auth , asyncHandler(deleteSection))

homeRouter.post("/slider/:section", auth , multerUpload.single("image"), asyncHandler(createSlider))
homeRouter.put("/slider/:section", auth , multerUpload.single("image"), asyncHandler(addToSlider))






export default homeRouter;