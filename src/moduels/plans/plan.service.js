import planModel from "../../DB/models/plan.js";

export const createPlan = async (req, res, next) => {

    let planExists = await planModel.findOne({ "english.name": req.body.english.name.toLowerCase().trim() })
    let arabicPlanExists = await planModel.findOne({ "arabic.name": req.body.arabic.name.toLowerCase().trim() })

    if (planExists ) {
        return next(new Error("english plan name already exists"))
    }

    if
    (arabicPlanExists ) {
        return next(new Error("arabic plan name already exists"))
    }
    req.body.price = Number(req.body.price)
    let plan = await planModel.create(req.body)
    return res.status(200).json({ message: "plan created successfully", plan })
}

export const updatePlan = async (req, res, next) => {
    const { price, arabic, english } = req.body;

    let plan = await planModel.findById(req.params.id)
    if (!plan) {
        return next(new Error("plan not found"))
    }

    if (english.name) {
        let nameExsist = await planModel.findOne({ "english.name": english.name.toLowerCase().trim() })
        if (nameExsist) {
            return next(new Error("plan name already exists"))
        }
        plan.english.name = english.name
    }

    if (arabic.name) {
        let nameExsist = await planModel.findOne({ "arabic.name": arabic.name.toLowerCase().trim() })
        if (nameExsist) {
            return next(new Error("plan name already exists"))
        }
        plan.arabic.name = arabic.name
    }

    plan.price = price ? Number(price) : plan.price
    plan.english.description = english.description ? english.description : plan.english.description
    plan.arabic.description = arabic.description ? arabic.description : plan.arabic.description
    plan.english.features = english.features ? english.features : plan.english.features
    plan.arabic.features = arabic.features ? arabic.features : plan.arabic.features
    await plan.save()
    return res.status(200).json({ message: "plan updated successfully", plan })
}

export const deletePlan = async (req, res, next) => {
    let plan = await planModel.findByIdAndDelete(req.params.id)
    if (!plan) {
        return next(new Error("plan not found"))
    }
    
    return res.status(200).json({ message: "plan deleted successfully" })
}

export const getPlan = async (req, res, next) => {
    let plan = await planModel.findOne({ "english.name": req.params.name.toLowerCase().trim() })
    if (!plan) {
        return next(new Error("plan not found"))
    }
    return res.status(200).json({ plan })
}

export const getAllPlans = async (req, res, next) => {
    let plans = await planModel.find()

    return res.status(200).json({ plans })
}
