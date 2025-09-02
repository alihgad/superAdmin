"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleSchema = exports.deleteArticleSchema = exports.addArticleSchema = exports.updateArticleSchema = void 0;
const joi_1 = require("joi");
const globalFields = require("../../utils/globalFields");
exports.updateArticleSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().trim().required().messages({
            "any.required": "Article id is required",
            "string.base": "Article id must be a string"
        })
    }),
    body: joi_1.default.object({
        article: joi_1.default.object({
            arabic: joi_1.default.string().trim().messages({
                "any.required": "Arabic article is required",
                "string.base": "Arabic article must be a string"
            }),
            english: joi_1.default.string().trim().messages({
                "any.required": "English article is required",
                "string.base": "English article must be a string"
            })
        }),
        arabic: joi_1.default.object({
            title: joi_1.default.string().min(3).messages({
                "string.min": "Arabic title must be at least 3 characters",
                "string.base": "Arabic title must be a string"
            }),
            content: joi_1.default.string().min(3).messages({
                "string.min": "Arabic content must be at least 3 characters",
                "string.base": "Arabic content must be a string"
            }),
            steps: joi_1.default.array().items(joi_1.default.string().trim()).messages({
                "array.base": "Arabic steps must be an array of strings"
            })
        }).optional(),
        english: joi_1.default.object({
            title: joi_1.default.string().min(3).messages({
                "string.min": "English title must be at least 3 characters",
                "string.base": "English title must be a string"
            }),
            content: joi_1.default.string().min(3).messages({
                "string.min": "English content must be at least 3 characters",
                "string.base": "English content must be a string"
            }),
            steps: joi_1.default.array().items(joi_1.default.string().trim()).messages({
                "array.base": "English steps must be an array of strings"
            })
        }).optional()
    }),
    files: joi_1.default.object({
        image: joi_1.default.array().items(globalFields.file),
        cover: joi_1.default.array().items(globalFields.file),
        vedio: joi_1.default.array().items(globalFields.file),
    }).optional()
};
exports.addArticleSchema = {
    body: joi_1.default.object({
        article: joi_1.default.object({
            arabic: joi_1.default.string().trim().required().messages({
                'any.required': 'Arabic article is required',
                'string.base': 'Arabic article must be a string',
            }),
            english: joi_1.default.string().trim().required().messages({
                'any.required': 'English article is required',
                'string.base': 'English article must be a string',
            })
        }),
        arabic: joi_1.default.object({
            title: joi_1.default.string()
                .trim()
                .required()
                .messages({
                'any.required': 'Arabic title is required',
                'string.base': 'Arabic title must be a string',
            }),
            content: joi_1.default.string()
                .trim()
                .required()
                .messages({
                'any.required': 'Arabic content is required',
                'string.base': 'Arabic content must be a string',
            }),
            steps: joi_1.default.array().items(joi_1.default.string().trim()).min(1).required().messages({
                'array.base': 'Arabic steps must be an array of strings',
                'any.required': 'Arabic steps are required',
                'array.min': 'At least one Arabic step is required'
            })
        }).required(),
        english: joi_1.default.object({
            title: joi_1.default.string()
                .trim()
                .required()
                .messages({
                'any.required': 'English title is required',
                'string.base': 'English title must be a string',
            }),
            content: joi_1.default.string()
                .trim()
                .required()
                .messages({
                'any.required': 'English content is required',
                'string.base': 'English content must be a string',
            }),
            steps: joi_1.default.array().items(joi_1.default.string().trim()).min(1).required().messages({
                'array.base': 'English steps must be an array of strings',
                'any.required': 'English steps are required',
                'array.min': 'At least one English step is required'
            })
        }).required(),
    }),
    files: joi_1.default.object({
        image: joi_1.default.array().items(globalFields.file),
        cover: joi_1.default.array().items(globalFields.file),
        vedio: joi_1.default.array().items(globalFields.file),
    }).optional()
};
exports.deleteArticleSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string()
            .trim()
            .required()
            .messages({
            "any.required": "Article id is required",
            "string.base": "Article id must be a string"
        })
    })
};
exports.getArticleSchema = {
    params: joi_1.default.object({
        id: globalFields.id
    })
};
//# sourceMappingURL=help.schema.js.map