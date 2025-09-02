"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestimonialSchema = exports.deleteTestimonialSchema = exports.updateTestimonialSchema = void 0;
const joi_1 = require("joi");
const globalFields = require("../../utils/globalFields");
exports.updateTestimonialSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().trim().min(2).messages({
            'string.base': 'Name must be a string',
            'string.min': 'Name must be at least 2 characters'
        }),
        text: joi_1.default.string().min(3).messages({
            'string.base': 'Text must be a string',
            'string.min': 'Text must be at least 3 characters'
        }),
        company: joi_1.default.string().trim().min(2).messages({
            'string.base': 'Company must be a string',
            'string.min': 'Company must be at least 2 characters'
        }),
        file: globalFields.file
    }),
    params: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            'any.required': 'Testimonial ID is required'
        })
    }),
    files: joi_1.default.object({}).optional()
};
exports.deleteTestimonialSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            'any.required': 'Testimonial ID is required'
        })
    })
};
exports.createTestimonialSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().trim().min(2).required().messages({
            'string.base': 'Name must be a string',
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        }),
        text: joi_1.default.string().min(3).required().messages({
            'string.base': 'Text must be a string',
            'string.min': 'Text must be at least 3 characters',
            'any.required': 'Text is required'
        }),
        company: joi_1.default.string().trim().min(2).required().messages({
            'string.base': 'Company must be a string',
            'string.min': 'Company must be at least 2 characters',
            'any.required': 'Company is required'
        })
    }),
    files: joi_1.default.object({
        file: globalFields.file
    })
};
//# sourceMappingURL=testimonials.schema.js.map