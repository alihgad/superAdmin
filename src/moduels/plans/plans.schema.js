import Joi from "joi";

export const createPlanSchema = {
    body: Joi.object({
        price: Joi.number().min(0).required().messages({
            "number.base": "Price must be a number",
            "number.min": "Price must be greater than or equal to 0",
            "any.required": "Price is required"
        }),

        arabic: Joi.object({
            name: Joi.string().trim().lowercase().min(2).required().messages({
                "string.base": "Arabic name must be a string",
                "string.min": "Arabic name must be at least 2 characters",
                "any.required": "Arabic name is required"
            }),
            description: Joi.string().min(3).required().messages({
                "string.base": "Arabic description must be a string",
                "string.min": "Arabic description must be at least 3 characters",
                "any.required": "Arabic description is required"
            }),
            features: Joi.array()
                .items(Joi.string().trim().min(1).messages({
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

        english: Joi.object({
            name: Joi.string().trim().lowercase().min(2).required().messages({
                "string.base": "English name must be a string",
                "string.min": "English name must be at least 2 characters",
                "any.required": "English name is required"
            }),
            description: Joi.string().min(3).required().messages({
                "string.base": "English description must be a string",
                "string.min": "English description must be at least 3 characters",
                "any.required": "English description is required"
            }),
            features: Joi.array()
                .items(Joi.string().trim().min(1).messages({
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
        }).required()
    }),

    params: Joi.object({}),
    files: Joi.object({})
};


export const updatePlanSchema = {
    body: Joi.object({
        price: Joi.number().min(0).messages({
            "number.base": "Price must be a number",
            "number.min": "Price must be greater than or equal to 0"
        }),

        arabic: Joi.object({
            name: Joi.string().trim().lowercase().min(2).messages({
                "string.base": "Arabic name must be a string",
                "string.min": "Arabic name must be at least 2 characters"
            }),
            description: Joi.string().min(3).messages({
                "string.base": "Arabic description must be a string",
                "string.min": "Arabic description must be at least 3 characters"
            }),
            features: Joi.array()
                .items(
                    Joi.string().trim().min(1).messages({
                        "string.base": "Each Arabic feature must be a string",
                        "string.empty": "Arabic feature can't be empty"
                    })
                )
                .min(1)
                .messages({
                    "array.base": "Arabic features must be an array",
                    "array.min": "Arabic features must contain at least one feature"
                })
        }).optional(),

        english: Joi.object({
            name: Joi.string().trim().lowercase().min(2).messages({
                "string.base": "English name must be a string",
                "string.min": "English name must be at least 2 characters"
            }),
            description: Joi.string().min(3).messages({
                "string.base": "English description must be a string",
                "string.min": "English description must be at least 3 characters"
            }),
            features: Joi.array()
                .items(
                    Joi.string().trim().min(1).messages({
                        "string.base": "Each English feature must be a string",
                        "string.empty": "English feature can't be empty"
                    })
                )
                .min(1)
                .messages({
                    "array.base": "English features must be an array",
                    "array.min": "English features must contain at least one feature"
                })
        }).optional()
    }),

    params: Joi.object({
        id: Joi.string().required().messages({
            "any.required": "Plan ID is required"
        })
    }),

    files: Joi.object({}).optional()
};

export const deletePlanSchema = {
    body: Joi.object({
    }),

    params: Joi.object({
        id: Joi.string().required().messages({
            "any.required": "Plan ID is required"
        })
    }),

    files: Joi.object({}).optional()
};
