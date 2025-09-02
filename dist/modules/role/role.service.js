"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleStats = exports.deleteRole = exports.updateRole = exports.getRoleById = exports.getAllRoles = exports.createRole = void 0;
const permission_1 = require("../../db/models/permission");
const role_1 = require("../../db/models/role");
const createRole = async (req, res, next) => {
    const { name, permissions } = req.body;
    const existingRole = await role_1.default.findOne({
        $or: [{ "name.english": name.english }, { "name.arabic": name.arabic }],
    });
    if (existingRole) {
        throw new Error(`Role with this name already exists ${name.english} or ${name.arabic}`);
    }
    const permissionsArray = await permission_1.default.find({
        _id: { $in: permissions },
    });
    if (permissionsArray.length !== permissions.length) {
        throw new Error("Some permissions not found");
    }
    const role = await role_1.default.create({
        name,
        permissions,
        createdBy: req.user?.userId,
        updatedBy: req.user?.userId,
    });
    return res.status(201).json({
        message: "Role created successfully",
        role,
    });
};
exports.createRole = createRole;
const getAllRoles = async (req, res, next) => {
    const roles = await role_1.default
        .find()
        .populate("permissions", "name key")
        .populate("createdBy", "name email")
        .populate("updatedBy", "name email");
    return res.status(200).json({
        message: "Roles fetched successfully",
        roles,
    });
};
exports.getAllRoles = getAllRoles;
const getRoleById = async (req, res, next) => {
    const { id } = req.params;
    const role = await role_1.default
        .findById(id)
        .populate("permissions", "name key")
        .populate("createdBy", "name email")
        .populate("updatedBy", "name email");
    if (!role) {
        throw new Error("Role not found");
    }
    return res.status(200).json({
        message: "Role fetched successfully",
        role,
    });
};
exports.getRoleById = getRoleById;
const updateRole = async (req, res, next) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const existingRole = await role_1.default.findOne({
        $or: [{ "name.english": name.english }, { "name.arabic": name.arabic }],
        _id: { $ne: id },
    });
    if (existingRole) {
        throw new Error(`Role with this name already exists ${name.english} or ${name.arabic}`);
    }
    const role = await role_1.default.findById(id);
    if (!role) {
        throw new Error("Role not found");
    }
    if (name) {
        if (name.english) {
            role.name.english = name.english;
        }
        if (name.arabic) {
            role.name.arabic = name.arabic;
        }
    }
    if (permissions) {
        role.permissions = permissions;
    }
    role.updatedBy = req.user?.userId;
    const updatedRole = await role.save();
    return res.status(200).json({
        message: "Role updated successfully",
        role: updatedRole,
    });
};
exports.updateRole = updateRole;
const deleteRole = async (req, res, next) => {
    const { id } = req.params;
    // Check if role is being used by any users
    const { userModel } = await Promise.resolve().then(() => require("../../DB/models/user.js"));
    const usersWithRole = await userModel.countDocuments({ role: id });
    if (usersWithRole > 0) {
        throw new Error(`Cannot delete role. It is assigned to ${usersWithRole} user(s)`);
    }
    const deletedRole = await role_1.default.findByIdAndDelete(id);
    if (!deletedRole) {
        throw new Error("Role not found");
    }
    return res.status(200).json({
        message: "Role deleted successfully",
    });
};
exports.deleteRole = deleteRole;
const getRoleStats = async (req, res, next) => {
    const totalRoles = await role_1.default.countDocuments();
    const createdByStats = await role_1.default.aggregate([
        {
            $group: {
                _id: "$createdBy",
                count: { $sum: 1 },
            },
        },
    ]);
    const permissionsStats = await role_1.default.aggregate([
        {
            $unwind: "$permissions",
        },
        {
            $group: {
                _id: "$permissions",
                count: { $sum: 1 },
            },
        },
    ]);
    return res.status(200).json({
        message: "Role stats fetched successfully",
        totalRoles,
        createdByStats,
        permissionsStats,
    });
};
exports.getRoleStats = getRoleStats;
//# sourceMappingURL=role.service.js.map