"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../../middlewares/multer");
const hs = require("./help.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const validator_1 = require("./../../middlewares/validator");
const schemas = require("./help.schema");
let helpRouter = (0, express_1.Router)();
helpRouter.post("/", multer_1.upload.fields([{ name: "image", maxCount: 1 }, { name: "cover", maxCount: 1 }, { name: "vedio", maxCount: 1 }]), (0, validator_1.default)(schemas.addArticleSchema), (0, asyncHandler_1.default)(hs.addArticle));
helpRouter.get("/", (0, asyncHandler_1.default)(hs.getAllArticles));
helpRouter.get("/:id", (0, validator_1.default)(schemas.getArticleSchema), (0, asyncHandler_1.default)(hs.getArticle));
helpRouter.put("/:id", multer_1.upload.fields([{ name: "image", maxCount: 1 }, { name: "cover", maxCount: 1 }, { name: "vedio", maxCount: 1 }]), (0, validator_1.default)(schemas.updateArticleSchema), (0, asyncHandler_1.default)(hs.updateArticle));
helpRouter.delete("/:id", (0, validator_1.default)(schemas.deleteArticleSchema), (0, asyncHandler_1.default)(hs.deleteArticle));
exports.default = helpRouter;
//# sourceMappingURL=help.controller.js.map