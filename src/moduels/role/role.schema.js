import Joi from "joi";

export const createRoleSchema = {
    body: Joi.object({
        name: Joi.object({
            arabic: Joi.string().min(2).required().messages({
                "string.base": "Arabic name must be a string",
                "string.min": "Arabic name must be at least 2 characters",
                "any.required": "Arabic name is required"
            }),
            english: Joi.string().min(2).required().messages({
                "string.base": "English name must be a string",
                "string.min": "English name must be at least 2 characters",
                "any.required": "English name is required"
            })
        }).required(),
        permissions: Joi.array().items(Joi.string()).min(1).required().messages({
            "array.base": "Permissions must be an array",
            "array.min": "At least one permission is required",
            "any.required": "Permissions are required"
        })
    })
};

export const updateRoleSchema = {
    params: Joi.object({
        id: Joi.string().required().messages({
            "any.required": "Role ID is required"
        })
    }),
    name: Joi.object({
        arabic: Joi.string().min(2).messages({
            "string.base": "Arabic name must be a string",
            "string.min": "Arabic name must be at least 2 characters"
        }),
        english: Joi.string().min(2).messages({
            "string.base": "English name must be a string",
            "string.min": "English name must be at least 2 characters"
        })
    }),
    permissions: Joi.array().items(Joi.string()).min(1).messages({
        "array.base": "Permissions must be an array",
        "array.min": "At least one permission is required"
    })
};

export const deleteRoleSchema = {
    params: Joi.object({
        id: Joi.string().required().messages({
            "any.required": "Role ID is required"
        })
    })
};
