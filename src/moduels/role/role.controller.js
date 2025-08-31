import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middelWares/validator.js";
import { auth } from "../../middelWares/auth.js";
import { 
    createRole, 
    getAllRoles, 
    getRoleById, 
    updateRole, 
    deleteRole, 
    getRoleStats 
} from "./role.service.js";
import { 
    createRoleSchema, 
    updateRoleSchema, 
    deleteRoleSchema 
} from "./role.schema.js";

let roleRouter = Router();

// Create new role
roleRouter.post("/", auth, validate(createRoleSchema), asyncHandler(createRole));

// Get all roles
roleRouter.get("/", auth, asyncHandler(getAllRoles));

// Get role by ID
roleRouter.get("/:id", auth, asyncHandler(getRoleById));

// Update role
roleRouter.put("/:id", auth, validate(updateRoleSchema), asyncHandler(updateRole));

// Delete role
roleRouter.delete("/:id", auth, validate(deleteRoleSchema), asyncHandler(deleteRole));

// Get role statistics
roleRouter.get("/stats/overview", auth, asyncHandler(getRoleStats));

export default roleRouter;
