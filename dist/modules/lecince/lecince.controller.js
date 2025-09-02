"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ls = require("./lecince.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const validator_1 = require("./../../middlewares/validator");
const schemas = require("./lecince.schema");
const multer_1 = require("../../middlewares/multer");
let lecinceRouter = (0, express_1.Router)();
// Create new lecince
lecinceRouter.post("/", multer_1.default.single("image"), (0, validator_1.default)(schemas.addLecinceSchema), (0, asyncHandler_1.default)(ls.addLecince));
// Get all lecince
lecinceRouter.get("/", (0, asyncHandler_1.default)(ls.getAllLecince));
// Get active lecince only
lecinceRouter.get("/active", (0, asyncHandler_1.default)(ls.getActiveLecince));
// Get specific lecince by ID
lecinceRouter.get("/:id", (0, validator_1.default)(schemas.getLecinceSchema), (0, asyncHandler_1.default)(ls.getLecince));
// Update lecince
lecinceRouter.put("/:id", multer_1.default.single("image"), (0, validator_1.default)(schemas.updateLecinceSchema), (0, asyncHandler_1.default)(ls.updateLecince));
// Toggle lecince status (activate/deactivate)
lecinceRouter.patch("/:id/toggle-status", (0, validator_1.default)(schemas.getLecinceSchema), (0, asyncHandler_1.default)(ls.toggleLecinceStatus));
// Delete lecince
lecinceRouter.delete("/:id", (0, validator_1.default)(schemas.deleteLecinceSchema), (0, asyncHandler_1.default)(ls.deleteLecince));
exports.default = lecinceRouter;
//# sourceMappingURL=lecince.controller.js.map