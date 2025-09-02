"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const validator_1 = require("../../middlewares/validator");
const plan_service_1 = require("./plan.service");
const plans_schema_1 = require("./plans.schema");
let planRouter = (0, express_1.Router)();
planRouter.get("/", (0, asyncHandler_1.default)(plan_service_1.getAllPlans));
planRouter.get("/:name", (0, asyncHandler_1.default)(plan_service_1.getPlan));
planRouter.post("/", (0, validator_1.default)(plans_schema_1.createPlanSchema), (0, asyncHandler_1.default)(plan_service_1.createPlan));
planRouter.put("/:id", (0, validator_1.default)(plans_schema_1.updatePlanSchema), (0, asyncHandler_1.default)(plan_service_1.updatePlan));
planRouter.delete("/:id", (0, asyncHandler_1.default)(plan_service_1.deletePlan));
exports.default = planRouter;
//# sourceMappingURL=plan.controller.js.map