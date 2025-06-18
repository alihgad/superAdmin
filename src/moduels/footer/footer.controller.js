import { Router } from "express";
import asyncHandler from "../../middelWares/asyncHandler.js";
import { addLink, addSocial, deleteImage, deleteLink, getAllLinks, updateImage, updateLink, updateSocial } from "./footer.service.js";
import upload from "../../middelWares/multer.js";


let footerRouter = Router()

footerRouter.post("/",asyncHandler(addLink))
footerRouter.put("/:id",asyncHandler(updateLink))
footerRouter.delete("/:id",asyncHandler(deleteLink))
footerRouter.get("/", asyncHandler(getAllLinks)) 

footerRouter.post("/social", upload.single("image") , asyncHandler(addSocial)) 
footerRouter.put("/social/:id" , asyncHandler(updateSocial)) 
footerRouter.patch("/social/:id", upload.single("image") , asyncHandler(updateImage)) 
footerRouter.delete("/social/:id",  asyncHandler(deleteImage)) 

 

export default footerRouter