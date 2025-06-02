import { Router } from "express";
import asyncHandler from "../../middelWares/asyncHandler.js";
import { getAllPlans, getPlan, updatePlan , createPlan , deletePlan } from "./plan.service.js";
import auth from "../../middelWares/auth.js";

let planRouter = Router()


planRouter.get("/", asyncHandler(getAllPlans))
planRouter.get("/:name", asyncHandler(getPlan))
planRouter.post("/", auth ,asyncHandler(createPlan))
planRouter.put("/:id", auth ,asyncHandler(updatePlan))
planRouter.delete("/:id", auth ,asyncHandler(deletePlan))

export default planRouter   