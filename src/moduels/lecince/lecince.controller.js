import { Router } from "express";
import * as ls from "./lecince.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "./../../middelWares/validator.js";
import * as schemas from "./lecince.schema.js";
import upload from "../../middelWares/multer.js";

let lecinceRouter = Router();

// Create new lecince
lecinceRouter.post("/",upload.single("image"), validate(schemas.addLecinceSchema), asyncHandler(ls.addLecince));

// Get all lecince
lecinceRouter.get("/", asyncHandler(ls.getAllLecince));

// Get active lecince only
lecinceRouter.get("/active", asyncHandler(ls.getActiveLecince));

// Get specific lecince by ID
lecinceRouter.get("/:id", validate(schemas.getLecinceSchema), asyncHandler(ls.getLecince));

// Update lecince
lecinceRouter.put("/:id",upload.single("image"), validate(schemas.updateLecinceSchema), asyncHandler(ls.updateLecince));

// Toggle lecince status (activate/deactivate)
lecinceRouter.patch("/:id/toggle-status", validate(schemas.getLecinceSchema), asyncHandler(ls.toggleLecinceStatus));

// Delete lecince
lecinceRouter.delete("/:id", validate(schemas.deleteLecinceSchema), asyncHandler(ls.deleteLecince));

export default lecinceRouter;

