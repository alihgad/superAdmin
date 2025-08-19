import lecinceModel from "../../DB/models/lecince.js";

export const addLecince = async (req, res, next) => {
    let { name, enumKey, price, isActive } = req.body;

    let newLecince = await lecinceModel.create({
        name: {
            arabic: name?.arabic,
            english: name?.english
        },
        enumKey,
        price,
        isActive: isActive !== undefined ? isActive : true
    });

    return res.status(201).json({
        message: "Lecince added successfully",
        lecince: newLecince
    });
}

export const getAllLecince = async (req, res, next) => {
    let lecince = await lecinceModel.find({}).select("-__v");
    
    if (!lecince || lecince.length === 0) {
        return res.status(404).json({
            message: "No lecince found"
        });
    }

    return res.status(200).json({
        message: "Lecince retrieved successfully",
        lecince
    });
}

export const getLecince = async (req, res, next) => {
    let { id } = req.params;

    let lecince = await lecinceModel.findById(id).select("-__v");
    if (!lecince) {
        return next(new Error("Lecince not found"), {
            statusCode: 404,
            message: "Lecince not found"
        });
    }

    return res.status(200).json({
        message: "Lecince retrieved successfully",
        lecince
    });
}

export const updateLecince = async (req, res, next) => {
    let { id } = req.params;
    let { name, enumKey, price, isActive } = req.body;

    let lecince = await lecinceModel.findById(id);
    if (!lecince) {
        return next(new Error("Lecince not found"), {
            statusCode: 404,
            message: "Lecince not found"
        });
    }

    let updateData = {};
    
    if (name) {
        if (name.arabic !== undefined) updateData['name.arabic'] = name.arabic;
        if (name.english !== undefined) updateData['name.english'] = name.english;
    }
    if (enumKey !== undefined) updateData.enumKey = enumKey;
    if (price !== undefined) updateData.price = price;
    if (isActive !== undefined) updateData.isActive = isActive;

    let updatedLecince = await lecinceModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).select("-__v");

    return res.status(200).json({
        message: "Lecince updated successfully",
        lecince: updatedLecince
    });
}

export const deleteLecince = async (req, res, next) => {
    let { id } = req.params;

    let lecince = await lecinceModel.findById(id);
    if (!lecince) {
        return next(new Error("Lecince not found"), {
            statusCode: 404,
            message: "Lecince not found"
        });
    }

    await lecinceModel.findByIdAndDelete(id);

    return res.status(200).json({
        message: "Lecince deleted successfully"
    });
}

export const toggleLecinceStatus = async (req, res, next) => {
    let { id } = req.params;

    let lecince = await lecinceModel.findById(id);
    if (!lecince) {
        return next(new Error("Lecince not found"), {
            statusCode: 404,
            message: "Lecince not found"
        });
    }

    lecince.isActive = !lecince.isActive;
    await lecince.save();

    return res.status(200).json({
        message: `Lecince ${lecince.isActive ? 'activated' : 'deactivated'} successfully`,
        lecince: {
            id: lecince._id,
            name: lecince.name,
            isActive: lecince.isActive
        }
    });
}

export const getActiveLecince = async (req, res, next) => {
    let lecince = await lecinceModel.find({ isActive: true }).select("-__v");
    
    if (!lecince || lecince.length === 0) {
        return res.status(404).json({
            message: "No active lecince found"
        });
    }

    return res.status(200).json({
        message: "Active lecince retrieved successfully",
        lecince
    });
}
