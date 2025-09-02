"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const validator_1 = require("../../middlewares/validator");
const auth_1 = require("../../middlewares/auth");
const role_service_1 = require("./role.service");
const role_schema_1 = require("./role.schema");
let roleRouter = (0, express_1.Router)();
// Create new role
roleRouter.post("/", auth_1.auth, (0, validator_1.default)(role_schema_1.createRoleSchema), (0, asyncHandler_1.default)(role_service_1.createRole));
// Get all roles
roleRouter.get("/", auth_1.auth, (0, asyncHandler_1.default)(role_service_1.getAllRoles));
// Get role by ID
roleRouter.get("/:id", auth_1.auth, (0, asyncHandler_1.default)(role_service_1.getRoleById));
// Update role
roleRouter.put("/:id", auth_1.auth, (0, validator_1.default)(role_schema_1.updateRoleSchema), (0, asyncHandler_1.default)(role_service_1.updateRole));
// Delete role
roleRouter.delete("/:id", auth_1.auth, (0, validator_1.default)(role_schema_1.deleteRoleSchema), (0, asyncHandler_1.default)(role_service_1.deleteRole));
// Get role statistics
roleRouter.get("/stats/overview", auth_1.auth, (0, asyncHandler_1.default)(role_service_1.getRoleStats));
exports.default = roleRouter;
//# sourceMappingURL=role.controller.js.map