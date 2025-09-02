"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanSchema = exports.deletePlanSchema = exports.updatePlanSchema = void 0;
const joi_1 = require("joi");
exports.updatePlanSchema = {
    body: joi_1.default.object({
        price: joi_1.default.number().min(0).messages({
            "number.base": "Price must be a number",
            "number.min": "Price must be greater than or equal to 0"
        }),
        arabic: joi_1.default.object({
            name: joi_1.default.string().trim().lowercase().min(2).messages({
                "string.base": "Arabic name must be a string",
                "string.min": "Arabic name must be at least 2 characters"
            }),
            description: joi_1.default.string().min(3).messages({
                "string.base": "Arabic description must be a string",
                "string.min": "Arabic description must be at least 3 characters"
            }),
            features: joi_1.default.array()
                .items(joi_1.default.string().trim().min(1).messages({
                "string.base": "Each Arabic feature must be a string",
                "string.empty": "Arabic feature can't be empty"
            }))
                .min(1)
                .messages({
                "array.base": "Arabic features must be an array",
                "array.min": "Arabic features must contain at least one feature"
            })
        }).optional(),
        english: joi_1.default.object({
            name: joi_1.default.string().trim().lowercase().min(2).messages({
                "string.base": "English name must be a string",
                "string.min": "English name must be at least 2 characters"
            }),
            description: joi_1.default.string().min(3).messages({
                "string.base": "English description must be a string",
                "string.min": "English description must be at least 3 characters"
            }),
            features: joi_1.default.array()
                .items(joi_1.default.string().trim().min(1).messages({
                "string.base": "Each English feature must be a string",
                "string.empty": "English feature can't be empty"
            }))
                .min(1)
                .messages({
                "array.base": "English features must be an array",
                "array.min": "English features must contain at least one feature"
            })
        }).optional(),
        activeFeatures: joi_1.default.array().items(joi_1.default.number().messages({
            "number.base": "Active feature must be a number",
            "number.min": "Active feature must be greater than or equal to 0",
        })).min(0).optional().messages({
            "array.base": "Active features must be an array of numbers",
            "array.min": "At least one active feature is required"
        })
    }),
    params: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            "any.required": "Plan ID is required"
        })
    }),
    files: joi_1.default.object({}).optional()
};
exports.deletePlanSchema = {
    body: joi_1.default.object({}),
    params: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            "any.required": "Plan ID is required"
        })
    }),
    files: joi_1.default.object({}).optional()
};
exports.createPlanSchema = {
    body: joi_1.default.object({
        price: joi_1.default.number().min(0).required().messages({
            "number.base": "Price must be a number",
            "number.min": "Price must be greater than or equal to 0",
            "any.required": "Price is required"
        }),
        arabic: joi_1.default.object({
            name: joi_1.default.string().trim().lowercase().min(2).required().messages({
                "string.base": "Arabic name must be a string",
                "string.min": "Arabic name must be at least 2 characters",
                "any.required": "Arabic name is required"
            }),
            description: joi_1.default.string().min(3).required().messages({
                "string.base": "Arabic description must be a string",
                "string.min": "Arabic description must be at least 3 characters",
                "any.required": "Arabic description is required"
            }),
            features: joi_1.default.array()
                .items(joi_1.default.string().trim().min(1).messages({
                "string.base": "Each feature must be a string",
                "string.empty": "Feature can't be empty"
            }))
                .min(1)
                .required()
                .messages({
                "array.base": "Arabic features must be an array",
                "array.min": "Arabic features must contain at least one feature",
                "any.required": "Arabic features are required"
            })
        }).required(),
        english: joi_1.default.object({
            name: joi_1.default.string().trim().lowercase().min(2).required().messages({
                "string.base": "English name must be a string",
                "string.min": "English name must be at least 2 characters",
                "any.required": "English name is required"
            }),
            description: joi_1.default.string().min(3).required().messages({
                "string.base": "English description must be a string",
                "string.min": "English description must be at least 3 characters",
                "any.required": "English description is required"
            }),
            features: joi_1.default.array()
                .items(joi_1.default.string().trim().min(1).messages({
                "string.base": "Each feature must be a string",
                "string.empty": "Feature can't be empty"
            }))
                .min(1)
                .required()
                .messages({
                "array.base": "English features must be an array",
                "array.min": "English features must contain at least one feature",
                "any.required": "English features are required"
            })
        }).required(),
        activeFeatures: joi_1.default.array().items(joi_1.default.number().messages({
            "number.base": "Active feature must be a number",
            "number.min": "Active feature must be greater than or equal to 0",
            "any.required": "Active feature is required"
        })).min(0).required().messages({
            "array.base": "Active features must be an array of numbers",
            "any.required": "Active features are required",
            "array.min": "At least one active feature is required"
        })
    }),
    params: joi_1.default.object({}),
    files: joi_1.default.object({})
};
//# sourceMappingURL=plans.schema.js.map