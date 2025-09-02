"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlans = exports.getPlan = exports.deletePlan = exports.updatePlan = exports.createPlan = void 0;
const plan_1 = require("../../db/models/plan");
const createPlan = async (req, res, next) => {
    let planExists = await plan_1.default.findOne({
        "english.name": req.body.english.name.trim(),
    });
    let arabicPlanExists = await plan_1.default.findOne({
        "arabic.name": req.body.arabic.name.trim(),
    });
    if (planExists) {
        return next(new Error("english plan name already exists"));
    }
    if (arabicPlanExists) {
        return next(new Error("arabic plan name already exists"));
    }
    req.body.price = Number(req.body.price);
    let plan = await plan_1.default.create(req.body);
    return res.status(200).json({ message: "plan created successfully", plan });
};
exports.createPlan = createPlan;
const updatePlan = async (req, res, next) => {
    const { price, arabic, english, activeFeatures } = req.body;
    let plan = await plan_1.default.findById(req.params.id);
    if (!plan) {
        return next(new Error("plan not found"));
    }
    if (english?.name) {
        let nameExsist = await plan_1.default.findOne({
            "english.name": english.name.trim(),
        });
        if (nameExsist) {
            return next(new Error("plan name already exists"));
        }
        plan.english.name = english.name;
    }
    if (arabic?.name) {
        let nameExsist = await plan_1.default.findOne({
            "arabic.name": arabic.name.trim(),
        });
        if (nameExsist) {
            return next(new Error("plan name already exists"));
        }
        plan.arabic.name = arabic.name;
    }
    if (activeFeatures?.length > 0) {
        plan.activeFeatures = activeFeatures;
    }
    plan.price = price ? Number(price) : plan.price;
    plan.english.description = english?.description
        ? english?.description
        : plan.english.description;
    plan.arabic.description = arabic?.description
        ? arabic?.description
        : plan.arabic.description;
    plan.english.features = english?.features
        ? english?.features
        : plan.english.features;
    plan.arabic.features = arabic?.features
        ? arabic?.features
        : plan.arabic.features;
    await plan.save();
    return res.status(200).json({ message: "plan updated successfully", plan });
};
exports.updatePlan = updatePlan;
const deletePlan = async (req, res, next) => {
    let plan = await plan_1.default.findByIdAndDelete(req.params.id);
    if (!plan) {
        return next(new Error("plan not found"));
    }
    return res.status(200).json({ message: "plan deleted successfully" });
};
exports.deletePlan = deletePlan;
const getPlan = async (req, res, next) => {
    let plan = await plan_1.default.findOne({
        "english.name": req.params.name.trim(),
    });
    if (!plan) {
        return next(new Error("plan not found"));
    }
    return res.status(200).json({ plan });
};
exports.getPlan = getPlan;
const getAllPlans = async (req, res, next) => {
    let plans = await plan_1.default.find();
    return res.status(200).json({ plans });
};
exports.getAllPlans = getAllPlans;
//# sourceMappingURL=plan.service.js.map