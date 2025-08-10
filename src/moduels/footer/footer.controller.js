import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import * as fs from "./footer.service.js";
import validate from "../../middelWares/validator.js";
import * as schemas from "./footer.schema.js";


let footerRouter = Router()

footerRouter.post("/social",validate(schemas.addSocialSchema), asyncHandler(fs.addSocial)) 
footerRouter.put("/social/:id" ,validate(schemas.updateSocialSchema), asyncHandler(fs.updateSocial)) 
footerRouter.delete("/social/:id", validate(schemas.deleteSocialMediaSchema),  asyncHandler(fs.deleteSocial)) 
footerRouter.get("/social", asyncHandler(fs.getAllSocial))

footerRouter.post("/:category", validate(schemas.addLinkSchema) ,asyncHandler(fs.addLink))
footerRouter.put("/:id", validate(schemas.updateLinkSchema),asyncHandler(fs.updateLink))
footerRouter.delete("/:id",validate(schemas.deleteLinkSchema),asyncHandler(fs.deleteLink))
footerRouter.get("/:category", validate(schemas.getAllCatLinksSchema), asyncHandler(fs.getAllCatLinks))     
footerRouter.get("/", asyncHandler(fs.getAllLinks)) 



 

export default footerRouter