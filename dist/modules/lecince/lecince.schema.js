"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLecinceSchema = exports.deleteLecinceSchema = exports.updateLecinceSchema = exports.addLecinceSchema = void 0;
const joi_1 = require("joi");
const globalFields = require("../../utils/globalFields.js");
exports.addLecinceSchema = {
    body: joi_1.default.object({
        name: joi_1.default.object({
            arabic: joi_1.default.string()
                .trim()
                .messages({
                'string.base': 'Arabic name must be a string',
            }),
            english: joi_1.default.string()
                .trim()
                .messages({
                'string.base': 'English name must be a string',
            })
        }).optional(),
        enumKey: joi_1.default.string()
            .trim()
            .messages({
            'string.base': 'Enum key must be a string',
        }),
        price: joi_1.default.number()
            .positive()
            .messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be positive',
        }),
        isActive: joi_1.default.boolean()
            .default(true)
            .messages({
            'boolean.base': 'isActive must be a boolean',
        }),
    })
};
exports.updateLecinceSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string()
            .trim()
            .messages({
            "string.base": "Lecince id must be a string"
        })
    }),
    body: joi_1.default.object({
        name: joi_1.default.object({
            arabic: joi_1.default.string()
                .trim()
                .messages({
                'string.base': 'Arabic name must be a string',
            }),
            english: joi_1.default.string()
                .trim()
                .messages({
                'string.base': 'English name must be a string',
            })
        }),
        enumKey: joi_1.default.string()
            .trim()
            .messages({
            'string.base': 'Enum key must be a string',
        }),
        price: joi_1.default.number()
            .positive()
            .messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be positive',
        }),
        isActive: joi_1.default.boolean()
            .messages({
            'boolean.base': 'isActive must be a boolean',
        }),
    })
};
exports.deleteLecinceSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string()
            .trim()
            .messages({
            "string.base": "Lecince id must be a string"
        })
    })
};
exports.getLecinceSchema = {
    params: joi_1.default.object({
        id: globalFields.id
    })
};
//# sourceMappingURL=lecince.schema.js.map