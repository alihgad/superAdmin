"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveLecince = exports.toggleLecinceStatus = exports.deleteLecince = exports.updateLecince = exports.getLecince = exports.getAllLecince = exports.addLecince = void 0;
const lecince_js_1 = require("../../DB/models/lecince.js");
const addLecince = async (req, res, next) => {
    let { name, enumKey, price, isActive } = req.body;
    let newLecince = await lecince_js_1.default.create({
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
};
exports.addLecince = addLecince;
const getAllLecince = async (req, res, next) => {
    let lecince = await lecince_js_1.default.find({}).select("-__v");
    if (!lecince || lecince.length === 0) {
        return res.status(404).json({
            message: "No lecince found"
        });
    }
    return res.status(200).json({
        message: "Lecince retrieved successfully",
        lecince
    });
};
exports.getAllLecince = getAllLecince;
const getLecince = async (req, res, next) => {
    let { id } = req.params;
    let lecince = await lecince_js_1.default.findById(id).select("-__v");
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
};
exports.getLecince = getLecince;
const updateLecince = async (req, res, next) => {
    let { id } = req.params;
    let { name, enumKey, price, isActive } = req.body;
    let lecince = await lecince_js_1.default.findById(id);
    if (!lecince) {
        return next(new Error("Lecince not found"), {
            statusCode: 404,
            message: "Lecince not found"
        });
    }
    let updateData = {};
    if (name) {
        if (name.arabic !== undefined)
            updateData['name.arabic'] = name.arabic;
        if (name.english !== undefined)
            updateData['name.english'] = name.english;
    }
    if (enumKey !== undefined)
        updateData.enumKey = enumKey;
    if (price !== undefined)
        updateData.price = price;
    if (isActive !== undefined)
        updateData.isActive = isActive;
    let updatedLecince = await lecince_js_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-__v");
    return res.status(200).json({
        message: "Lecince updated successfully",
        lecince: updatedLecince
    });
};
exports.updateLecince = updateLecince;
const deleteLecince = async (req, res, next) => {
    let { id } = req.params;
    let lecince = await lecince_js_1.default.findById(id);
    if (!lecince) {
        return next(new Error("Lecince not found"), {
            statusCode: 404,
            message: "Lecince not found"
        });
    }
    await lecince_js_1.default.findByIdAndDelete(id);
    return res.status(200).json({
        message: "Lecince deleted successfully"
    });
};
exports.deleteLecince = deleteLecince;
const toggleLecinceStatus = async (req, res, next) => {
    let { id } = req.params;
    let lecince = await lecince_js_1.default.findById(id);
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
};
exports.toggleLecinceStatus = toggleLecinceStatus;
const getActiveLecince = async (req, res, next) => {
    let lecince = await lecince_js_1.default.find({ isActive: true }).select("-__v");
    if (!lecince || lecince.length === 0) {
        return res.status(404).json({
            message: "No active lecince found"
        });
    }
    return res.status(200).json({
        message: "Active lecince retrieved successfully",
        lecince
    });
};
exports.getActiveLecince = getActiveLecince;
//# sourceMappingURL=lecince.service.js.map