import Joi from "joi";

export const createUserSchema = {
    body: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().optional(),
    })
};

export const updateUserSchema = {
    body: Joi.object({
        name: Joi.string().min(2).max(50),
        email: Joi.string().email(),
        role: Joi.string().optional(),
    })
};

export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};

export const forgotPasswordSchema = {
    body: Joi.object({
        email: Joi.string().email().required()
    })
};

export const resetPasswordSchema = {
    body: Joi.object({
        token: Joi.string().required(),
        newPassword: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
    })
};

export const changePasswordSchema = {
    body: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
    })
}; 
