"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleSchema = exports.updateRoleSchema = exports.createRoleSchema = void 0;
const joi_1 = require("joi");
exports.createRoleSchema = {
    body: joi_1.default.object({
        name: joi_1.default.object({
            arabic: joi_1.default.string().min(2).required().messages({
                "string.base": "Arabic name must be a string",
                "string.min": "Arabic name must be at least 2 characters",
                "any.required": "Arabic name is required"
            }),
            english: joi_1.default.string().min(2).required().messages({
                "string.base": "English name must be a string",
                "string.min": "English name must be at least 2 characters",
                "any.required": "English name is required"
            })
        }).required(),
        permissions: joi_1.default.array().items(joi_1.default.string()).min(1).required().messages({
            "array.base": "Permissions must be an array",
            "array.min": "At least one permission is required",
            "any.required": "Permissions are required"
        })
    })
};
exports.updateRoleSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            "any.required": "Role ID is required"
        })
    }),
    name: joi_1.default.object({
        arabic: joi_1.default.string().min(2).messages({
            "string.base": "Arabic name must be a string",
            "string.min": "Arabic name must be at least 2 characters"
        }),
        english: joi_1.default.string().min(2).messages({
            "string.base": "English name must be a string",
            "string.min": "English name must be at least 2 characters"
        })
    }),
    permissions: joi_1.default.array().items(joi_1.default.string()).min(1).messages({
        "array.base": "Permissions must be an array",
        "array.min": "At least one permission is required"
    })
};
exports.deleteRoleSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            "any.required": "Role ID is required"
        })
    })
};
//# sourceMappingURL=role.schema.js.map