import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middelWares/validator.js"
import { getAllPlans, getPlan, updatePlan , createPlan , deletePlan } from "./plan.service.js";
import auth from "../../middelWares/auth.js";
import { createPlanSchema, updatePlanSchema } from "./plans.schema.js";

let planRouter = Router()


planRouter.get("/", asyncHandler(getAllPlans))
planRouter.get("/:name", asyncHandler(getPlan))
planRouter.post("/", auth() , validate(createPlanSchema), asyncHandler(createPlan))
planRouter.put("/:id", auth() ,validate(updatePlanSchema) ,asyncHandler(updatePlan))
planRouter.delete("/:id", auth() ,asyncHandler(deletePlan))

export default planRouter   