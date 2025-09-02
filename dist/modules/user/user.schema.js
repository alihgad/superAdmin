"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = require("joi");
exports.createUserSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().min(2).max(50).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        role: joi_1.default.string().optional(),
    })
};
exports.updateUserSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().min(2).max(50),
        email: joi_1.default.string().email(),
        role: joi_1.default.string().optional(),
    })
};
exports.loginSchema = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    })
};
exports.forgotPasswordSchema = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required()
    })
};
exports.resetPasswordSchema = {
    body: joi_1.default.object({
        token: joi_1.default.string().required(),
        newPassword: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("newPassword")).required()
    })
};
exports.changePasswordSchema = {
    body: joi_1.default.object({
        currentPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("newPassword")).required()
    })
};
//# sourceMappingURL=user.schema.js.map