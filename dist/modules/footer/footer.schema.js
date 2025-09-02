"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSocialMediaSchema = exports.updateSocialSchema = exports.addSocialSchema = exports.getAllCatLinksSchema = exports.deleteLinkSchema = exports.updateLinkSchema = exports.addLinkSchema = void 0;
const joi_1 = require("joi");
const globalField = require("../../utils/globalFields");
exports.addLinkSchema = {
    body: joi_1.default.object({
        link: joi_1.default.string().trim().lowercase().required().messages({
            "string.base": "Link must be a string",
            "string.uri": "Link must be a valid URI",
            "any.required": "Link is required",
        }),
        arabic: joi_1.default.object({
            title: joi_1.default.string().min(2).trim().lowercase().required().messages({
                "string.base": "Arabic title must be a string",
                "string.min": "Arabic title must be at least 2 characters",
                "any.required": "Arabic title is required",
            }),
        }).required(),
        english: joi_1.default.object({
            title: joi_1.default.string().min(2).trim().lowercase().required().messages({
                "string.base": "English title must be a string",
                "string.min": "English title must be at least 2 characters",
                "any.required": "English title is required",
            }),
        }).required(),
    }),
    params: joi_1.default.object({
        category: joi_1.default.string().trim().lowercase().required().messages({
            "string.base": "Category must be a string",
            "any.required": "Category is required",
        }),
    }),
};
exports.updateLinkSchema = {
    body: joi_1.default.object({
        link: joi_1.default.string().trim().lowercase().messages({
            "string.base": "Link must be a string",
            "string.uri": "Link must be a valid URI",
        }),
        arabic: joi_1.default.object({
            title: joi_1.default.string().min(2).trim().lowercase().messages({
                "string.base": "Arabic title must be a string",
                "string.min": "Arabic title must be at least 2 characters",
            }),
        }),
        english: joi_1.default.object({
            title: joi_1.default.string().min(2).trim().lowercase().messages({
                "string.base": "English title must be a string",
                "string.min": "English title must be at least 2 characters",
            }),
        }),
    })
        .min(1)
        .messages({
        "object.min": "At least one field must be provided for update",
    }),
    params: joi_1.default.object({
        id: globalField.id,
    }),
};
exports.deleteLinkSchema = {
    params: joi_1.default.object({
        id: globalField.id,
    }),
};
exports.getAllCatLinksSchema = {
    params: joi_1.default.object({
        category: joi_1.default.string().trim().lowercase().required().messages({
            "string.base": "Category must be a string",
            "any.required": "Category is required",
        }),
    }),
};
exports.addSocialSchema = {
    body: joi_1.default.object({
        link: joi_1.default.string()
            // .uri()
            // .trim()
            // .lowercase()
            // .required()
            // .messages({
            //     'string.base': 'Link must be a string',
            //     'string.uri': 'Link must be a valid URL',
            //     'any.required': 'Link is required'
            // }),
            .required(),
        icon: joi_1.default.string().trim().lowercase().required().messages({
            "string.base": "Icon must be a string",
            "any.required": "Icon is required",
        }),
    }),
};
exports.updateSocialSchema = {
    body: joi_1.default.object({
        link: joi_1.default.string().uri().trim().lowercase().messages({
            "string.base": "Link must be a string",
            "string.uri": "Link must be a valid URL",
        }),
        icon: joi_1.default.string().trim().lowercase().messages({
            "string.base": "Icon must be a string",
        }),
        display: joi_1.default.boolean().messages({
            "boolean.base": "Display must be true or false",
        }),
    })
        .min(1)
        .messages({
        "object.min": "At least one field must be provided to update",
    }),
    params: joi_1.default.object({
        id: globalField.id,
    }),
};
exports.deleteSocialMediaSchema = {
    params: joi_1.default.object({
        id: globalField.id,
    }),
};
//# sourceMappingURL=footer.schema.js.map