"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBlogSectionSchema = exports.updateBlogSectionSchema = exports.getBlogSchema = exports.deleteBlogSectionSchema = exports.deleteBlogSchema = exports.updateBlogSchema = exports.addBlogSchema = void 0;
const joi_1 = require("joi");
const globalFields = require("../../utils/globalFields");
exports.addBlogSchema = {
    body: joi_1.default.object({
        text: joi_1.default.string()
            .trim()
            .messages({
            'string.base': 'Blog text must be a string',
        }),
        sections: joi_1.default.array().items(joi_1.default.object({
            title: joi_1.default.object({
                arabic: joi_1.default.string().trim().messages({
                    'string.base': 'Section title must be a string',
                }),
                english: joi_1.default.string().trim().messages({
                    'string.base': 'Section title must be a string',
                }),
            }),
            content: joi_1.default.object({
                arabic: joi_1.default.array().items(joi_1.default.string().trim()).min(1).messages({
                    'string.base': 'Section content must be a string',
                }),
                english: joi_1.default.array().items(joi_1.default.string().trim()).min(1).messages({
                    'string.base': 'Section content must be a string',
                }),
            })
        })).min(1)
    }),
    files: joi_1.default.object({
        image: joi_1.default.array().items(globalFields.file)
    })
};
exports.updateBlogSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().trim().messages({
            "any.required": "Blog id is required",
            "string.base": "Blog id must be a string"
        })
    }),
    body: joi_1.default.object({
        text: joi_1.default.string()
            .trim()
            .messages({
            'string.base': 'Blog text must be a string',
        }),
    }),
    files: joi_1.default.object({
        image: globalFields.file,
    })
};
exports.deleteBlogSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string()
            .trim()
            .required()
            .messages({
            "any.required": "Blog id is required",
            "string.base": "Blog id must be a string"
        })
    })
};
exports.deleteBlogSectionSchema = {
    params: joi_1.default.object({
        id: globalFields.id,
        sectionId: globalFields.id
    })
};
exports.getBlogSchema = {
    params: joi_1.default.object({
        id: globalFields.id
    })
};
exports.updateBlogSectionSchema = {
    params: joi_1.default.object({
        blogId: globalFields.id,
        sectionId: globalFields.id
    }),
    body: joi_1.default.object({
        title: joi_1.default.object({
            arabic: joi_1.default.string().trim().messages({
                'string.base': 'Section title must be a string',
            }),
            english: joi_1.default.string().trim().messages({
                'string.base': 'Section title must be a string',
            }),
        }),
        content: joi_1.default.object({
            arabic: joi_1.default.array().items(joi_1.default.string().trim()).min(1).messages({
                'array.base': 'Section content must be an array of strings',
                'array.min': 'At least one content item is required'
            }),
            english: joi_1.default.array().items(joi_1.default.string().trim()).min(1).messages({
                'array.base': 'Section content must be an array of strings',
                'array.min': 'At least one content item is required'
            }),
        })
    })
};
exports.addBlogSectionSchema = {
    params: joi_1.default.object({
        blogId: globalFields.id,
    }),
    body: joi_1.default.object({
        title: joi_1.default.object({
            arabic: joi_1.default.string().trim().messages({
                'string.base': 'Section title must be a string',
            }),
            english: joi_1.default.string().trim().messages({
                'string.base': 'Section title must be a string',
            }),
        }),
        content: joi_1.default.object({
            arabic: joi_1.default.array().items(joi_1.default.string().trim()).min(1).messages({
                'array.base': 'Section content must be an array of strings',
                'array.min': 'At least one content item is required'
            }),
            english: joi_1.default.array().items(joi_1.default.string().trim()).min(1).messages({
                'array.base': 'Section content must be an array of strings',
                'array.min': 'At least one content item is required'
            }),
        })
    })
};
//# sourceMappingURL=blog.schema.js.map