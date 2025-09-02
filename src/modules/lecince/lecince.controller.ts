import { Router } from "express";
import * as ls from "./lecince.service";
import asyncHandler from "../../utils/asyncHandler";
import validate from "./../../middlewares/validator";
import * as schemas from "./lecince.schema";
import upload from "../../middlewares/multer";

let lecinceRouter = Router();

// Create new lecince
lecinceRouter.post(
  "/",
  upload.single("image"),
  validate(schemas.addLecinceSchema),
  asyncHandler(ls.addLecince)
);

// Get all lecince
lecinceRouter.get("/", asyncHandler(ls.getAllLecince));

// Get active lecince only
lecinceRouter.get("/active", asyncHandler(ls.getActiveLecince));

// Get specific lecince by ID
lecinceRouter.get(
  "/:id",
  validate(schemas.getLecinceSchema),
  asyncHandler(ls.getLecince)
);

// Update lecince
lecinceRouter.put(
  "/:id",
  upload.single("image"),
  validate(schemas.updateLecinceSchema),
  asyncHandler(ls.updateLecince)
);

// Toggle lecince status (activate/deactivate)
lecinceRouter.patch(
  "/:id/toggle-status",
  validate(schemas.getLecinceSchema),
  asyncHandler(ls.toggleLecinceStatus)
);

// Delete lecince
lecinceRouter.delete(
  "/:id",
  validate(schemas.deleteLecinceSchema),
  asyncHandler(ls.deleteLecince)
);

export default lecinceRouter;
