import planModel from "../../DB/models/plan.js";

export const createPlan = async (req, res, next) => {
    const { name, price , description , features } = req.body;
    let planExists = await planModel.findOne({ name })
    if (planExists) {
        return next(new Error("plan already exists"))
    }
    let plan = new planModel({
        name,
        price,
        description,
        features
    })
    await plan.save()
    return res.status(200).json({ message: "plan created successfully", plan })
}

export const updatePlan = async (req, res, next) => {
    const { name, price , description , features } = req.body;
    let plan = await planModel.findById(req.params.id)
    if (!plan) {
        return next(new Error("plan not found"))
    }
    if(name){
        let nameExsist = await planModel.findOne({name})
        if(nameExsist){
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
    let plan = await planModel.findOne({ name: req.params.name })
    if (!plan) {
        return next(new Error("plan not found"))
    }
    return res.status(200).json({ plan })
}

export const getAllPlans = async (req, res, next) => {
    let plans = await planModel.find()
    
    return res.status(200).json({ plans })
}
