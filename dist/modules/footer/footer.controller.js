"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const fs = require("./footer.service");
const validator_1 = require("../../middlewares/validator");
const schemas = require("./footer.schema");
const footerRouter = (0, express_1.Router)();
footerRouter.post("/social", (0, validator_1.default)(schemas.addSocialSchema), (0, asyncHandler_1.default)(fs.addSocial));
footerRouter.put("/social/:id", (0, validator_1.default)(schemas.updateSocialSchema), (0, asyncHandler_1.default)(fs.updateSocial));
footerRouter.delete("/social/:id", (0, validator_1.default)(schemas.deleteSocialMediaSchema), (0, asyncHandler_1.default)(fs.deleteSocial));
footerRouter.get("/social", (0, asyncHandler_1.default)(fs.getAllSocial));
footerRouter.post("/:category", (0, validator_1.default)(schemas.addLinkSchema), (0, asyncHandler_1.default)(fs.addLink));
footerRouter.put("/:id", (0, validator_1.default)(schemas.updateLinkSchema), (0, asyncHandler_1.default)(fs.updateLink));
footerRouter.delete("/:id", (0, validator_1.default)(schemas.deleteLinkSchema), (0, asyncHandler_1.default)(fs.deleteLink));
footerRouter.get("/:category", (0, validator_1.default)(schemas.getAllCatLinksSchema), (0, asyncHandler_1.default)(fs.getAllCatLinks));
footerRouter.get("/", (0, asyncHandler_1.default)(fs.getAllLinks));
exports.default = footerRouter;
//# sourceMappingURL=footer.controller.js.map