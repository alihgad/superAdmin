import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import validate from "../../middlewares/validator"
import { getAllPlans, getPlan, updatePlan , createPlan , deletePlan } from "./plan.service";

import { createPlanSchema, updatePlanSchema } from "./plans.schema";

let planRouter = Router()



planRouter.get("/", asyncHandler(getAllPlans))
planRouter.get("/:name", asyncHandler(getPlan))
planRouter.post("/", validate(createPlanSchema), asyncHandler(createPlan))
planRouter.put("/:id", validate(updatePlanSchema), asyncHandler(updatePlan))
planRouter.delete("/:id",asyncHandler(deletePlan))





export default planRouter   