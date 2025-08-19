import { Router } from "express";
import { upload } from "../../middelWares/multer.js";
import * as hs from "./hardware.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "./../../middelWares/validator.js";
import * as schemas from "./hardware.schema.js";

let hardwareRouter = Router();

// Create new hardware
hardwareRouter.post("/", upload.single("image"), validate(schemas.addHardwareSchema), asyncHandler(hs.addHardware));

// Get all hardware
hardwareRouter.get("/", asyncHandler(hs.getAllHardware));

// Get active hardware only
hardwareRouter.get("/active", asyncHandler(hs.getActiveHardware));

// Get specific hardware by ID
hardwareRouter.get("/:id", validate(schemas.getHardwareSchema), asyncHandler(hs.getHardware));

// Update hardware
hardwareRouter.put("/:id", upload.single("image"), validate(schemas.updateHardwareSchema), asyncHandler(hs.updateHardware));

// Toggle hardware status (activate/deactivate)
hardwareRouter.patch("/:id/toggle-status", validate(schemas.getHardwareSchema), asyncHandler(hs.toggleHardwareStatus));

// Delete hardware
hardwareRouter.delete("/:id", validate(schemas.deleteHardwareSchema), asyncHandler(hs.deleteHardware));

export default hardwareRouter;
