import planModel from "../../DB/models/plan.js";

export const createPlan = async (req, res, next) => {

    let planExists = await planModel.findOne({ "english.name": req.body.english.name })

    if (planExists) {
        return next(new Error("plan already exists"))
    }
    let plan = await planModel.create(req.body)
    return res.status(200).json({ message: "plan created successfully", plan })
}

export const updatePlan = async (req, res, next) => {
    const { name, price, description, features } = req.body;

    if (!req.params.id) {
        return next(new Error("plan id is required"))
    }

    if (!name && !price && !description && !features) {
        return next(new Error("at least one field is required to update"))
    }

    if (price) {
        if (isNaN(price)) {
            return next(new Error("price must be a number"))
        }
        if (price < 0) {
            return next(new Error("price must be greater than or equal to 0"))
        }
    }

    if (description && typeof description !== "string") {
        return next(new Error("description must be a string"))
    }

    if (name && typeof name !== "string") {
        return next(new Error("name must be a string"))
    }

    if (features) {
        if (!typeof features !== "string") {
            return next(new Error("features must be an string with , as separator"))
        }

        features = features.split(",").map(feature => feature.trim());
        if (features.length < 1) {
            return next(new Error("features must contain at least one feature"))
        }

        for (let feature of features) {
            if (typeof feature !== "string") {
                return next(new Error("each feature must be a string"))
            }
        }
    }

    let plan = await planModel.findById(req.params.id)
    if (!plan) {
        return next(new Error("plan not found"))
    }
    if (name) {
        let nameExsist = await planModel.findOne({ name })
        if (nameExsist) {
            return next(new Error("plan name already exists"))
        }
        plan.name = name
    }

    plan.price = price ? price : plan.price
    plan.description = description ? description : plan.description
    plan.features = features ? features : plan.features
    await plan.save()
    return res.status(200).json({ message: "plan updated successfully", plan })
}

export const deletePlan = async (req, res, next) => {
    let plan = await planModel.findById(req.params.id)
    if (!plan) {
        return next(new Error("plan not found"))
    }
    await plan.remove()
    return res.status(200).json({ message: "plan deleted successfully" })
}

export const getPlan = async (req, res, next) => {
    let plan = await planModel.findOne({ "english.name": req.params.name })
    if (!plan) {
        return next(new Error("plan not found"))
    }
    return res.status(200).json({ plan })
}

export const getAllPlans = async (req, res, next) => {
    let plans = await planModel.find()

    return res.status(200).json({ plans })
}
