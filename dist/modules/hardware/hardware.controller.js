"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../../middlewares/multer");
const hs = require("./hardware.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const validator_1 = require("./../../middlewares/validator");
const schemas = require("./hardware.schema");
let hardwareRouter = (0, express_1.Router)();
// Create new hardware
hardwareRouter.post("/", multer_1.upload.single("image"), (0, validator_1.default)(schemas.addHardwareSchema), (0, asyncHandler_1.default)(hs.addHardware));
// Get all hardware
hardwareRouter.get("/", (0, asyncHandler_1.default)(hs.getAllHardware));
// Get active hardware only
hardwareRouter.get("/active", (0, asyncHandler_1.default)(hs.getActiveHardware));
// Get specific hardware by ID
hardwareRouter.get("/:id", (0, validator_1.default)(schemas.getHardwareSchema), (0, asyncHandler_1.default)(hs.getHardware));
// Update hardware
hardwareRouter.put("/:id", multer_1.upload.single("image"), (0, validator_1.default)(schemas.updateHardwareSchema), (0, asyncHandler_1.default)(hs.updateHardware));
// Toggle hardware status (activate/deactivate)
hardwareRouter.patch("/:id/toggle-status", (0, validator_1.default)(schemas.getHardwareSchema), (0, asyncHandler_1.default)(hs.toggleHardwareStatus));
// Delete hardware
hardwareRouter.delete("/:id", (0, validator_1.default)(schemas.deleteHardwareSchema), (0, asyncHandler_1.default)(hs.deleteHardware));
exports.default = hardwareRouter;
//# sourceMappingURL=hardware.controller.js.map