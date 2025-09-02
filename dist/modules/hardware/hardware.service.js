"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveHardware = exports.toggleHardwareStatus = exports.deleteHardware = exports.updateHardware = exports.getHardware = exports.getAllHardware = exports.addHardware = void 0;
const hardware_1 = require("../../db/models/hardware");
const multer_1 = require("../../middlewares/multer");
const addHardware = async (req, res, next) => {
    let { arabic, english, enumKey, price, isActive } = req.body;
    let image = null;
    let uploadImage = async () => {
        let { public_id, secure_url } = await multer_1.cloudinaryUpload.uploader
            .upload(req.file.path, {
            folder: `superAdmin/hardware`,
            resource_type: "image",
        })
            .catch((error) => next(new Error("Image upload failed " + error.message + ""), {
            statusCode: 500,
            message: error.message,
        }));
        return {
            public_id: public_id,
            secure_url: secure_url,
        };
    };
    if (req.file) {
        image = await uploadImage();
        if (!image) {
            return next(new Error("Image upload failed"), {
                statusCode: 500,
                message: "Image upload failed",
            });
        }
    }
    let newHardware = await hardware_1.default.create({
        arabic,
        english,
        enumKey,
        price,
        isActive: isActive !== undefined ? isActive : true,
        image,
    });
    return res.status(201).json({
        message: "Hardware added successfully",
        hardware: newHardware,
    });
};
exports.addHardware = addHardware;
const getAllHardware = async (req, res, next) => {
    let hardware = await hardware_1.default.find({}).select("-__v");
    if (!hardware || hardware.length === 0) {
        return res.status(404).json({
            message: "No hardware found",
        });
    }
    return res.status(200).json({
        message: "Hardware retrieved successfully",
        hardware,
    });
};
exports.getAllHardware = getAllHardware;
const getHardware = async (req, res, next) => {
    let { id } = req.params;
    let hardware = await hardware_1.default.findById(id).select("-__v");
    if (!hardware) {
        return next(new Error("Hardware not found"), {
            statusCode: 404,
            message: "Hardware not found",
        });
    }
    return res.status(200).json({
        message: "Hardware retrieved successfully",
        hardware,
    });
};
exports.getHardware = getHardware;
const updateHardware = async (req, res, next) => {
    let { id } = req.params;
    let { arabic, english, enumKey, price, isActive } = req.body;
    let hardware = await hardware_1.default.findById(id);
    if (!hardware) {
        return next(new Error("Hardware not found"), {
            statusCode: 404,
            message: "Hardware not found",
        });
    }
    let updateData = {};
    if (arabic) {
        if (arabic.name !== undefined)
            updateData["arabic.name"] = arabic.name;
        if (arabic.description !== undefined)
            updateData["arabic.description"] = arabic.description;
        if (arabic.spec !== undefined)
            updateData["arabic.spec"] = arabic.spec;
    }
    if (english) {
        if (english.name !== undefined)
            updateData["english.name"] = english.name;
        if (english.description !== undefined)
            updateData["english.description"] = english.description;
        if (english.spec !== undefined)
            updateData["english.spec"] = english.spec;
    }
    if (enumKey !== undefined)
        updateData.enumKey = enumKey;
    if (price !== undefined)
        updateData.price = price;
    if (isActive !== undefined)
        updateData.isActive = isActive;
    // Handle image upload if provided
    if (req.file) {
        // Delete old image from cloudinary if exists
        if (hardware.image && hardware.image.public_id) {
            await multer_1.cloudinaryUpload.uploader
                .destroy(hardware.image.public_id)
                .catch((error) => {
                console.log("Error deleting old image from cloudinary:", error.message);
            });
        }
        let uploadImage = async () => {
            let { public_id, secure_url } = await multer_1.cloudinaryUpload.uploader
                .upload(req.file.path, {
                folder: `superAdmin/hardware`,
                resource_type: "image",
            })
                .catch((error) => next(new Error("Image upload failed " + error.message + ""), {
                statusCode: 500,
                message: error.message,
            }));
            return {
                public_id: public_id,
                secure_url: secure_url,
            };
        };
        let image = await uploadImage();
        if (image) {
            updateData.image = image;
        }
    }
    let updatedHardware = await hardware_1.default
        .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        .select("-__v");
    return res.status(200).json({
        message: "Hardware updated successfully",
        hardware: updatedHardware,
    });
};
exports.updateHardware = updateHardware;
const deleteHardware = async (req, res, next) => {
    let { id } = req.params;
    let hardware = await hardware_1.default.findById(id);
    if (!hardware) {
        return next(new Error("Hardware not found"), {
            statusCode: 404,
            message: "Hardware not found",
        });
    }
    // Delete image from cloudinary if exists
    if (hardware.image && hardware.image.public_id) {
        await multer_1.cloudinaryUpload.uploader
            .destroy(hardware.image.public_id)
            .catch((error) => {
            console.log("Error deleting image from cloudinary:", error.message);
        });
    }
    await hardware_1.default.findByIdAndDelete(id);
    return res.status(200).json({
        message: "Hardware deleted successfully",
    });
};
exports.deleteHardware = deleteHardware;
const toggleHardwareStatus = async (req, res, next) => {
    let { id } = req.params;
    let hardware = await hardware_1.default.findById(id);
    if (!hardware) {
        return next(new Error("Hardware not found"), {
            statusCode: 404,
            message: "Hardware not found",
        });
    }
    hardware.isActive = !hardware.isActive;
    await hardware.save();
    return res.status(200).json({
        message: `Hardware ${hardware.isActive ? "activated" : "deactivated"} successfully`,
        hardware: {
            id: hardware._id,
            name: hardware.name,
            isActive: hardware.isActive,
        },
    });
};
exports.toggleHardwareStatus = toggleHardwareStatus;
const getActiveHardware = async (req, res, next) => {
    let hardware = await hardware_1.default.find({ isActive: true }).select("-__v");
    if (!hardware || hardware.length === 0) {
        return res.status(404).json({
            message: "No active hardware found",
        });
    }
    return res.status(200).json({
        message: "Active hardware retrieved successfully",
        hardware,
    });
};
exports.getActiveHardware = getActiveHardware;
//# sourceMappingURL=hardware.service.js.map