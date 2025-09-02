"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHardwareSchema = exports.deleteHardwareSchema = exports.updateHardwareSchema = exports.addHardwareSchema = void 0;
const joi_1 = require("joi");
const globalFields = require("../../utils/globalFields");
exports.addHardwareSchema = {
    body: joi_1.default.object({
        arabic: joi_1.default.object({
            name: joi_1.default.string().trim().messages({
                "string.base": "Arabic name must be a string",
            }),
            description: joi_1.default.string().trim().messages({
                "string.base": "Arabic description must be a string",
            }),
            spec: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().trim().required(),
                value: joi_1.default.string().trim().required(),
            })),
        }).optional(),
        english: joi_1.default.object({
            name: joi_1.default.string().trim().messages({
                "string.base": "English name must be a string",
            }),
            description: joi_1.default.string().trim().messages({
                "string.base": "English description must be a string",
            }),
            spec: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().trim().required(),
                value: joi_1.default.string().trim().required(),
            })),
        }).optional(),
        enumKey: joi_1.default.string().trim().messages({
            "string.base": "Enum key must be a string",
        }),
        price: joi_1.default.number().positive().messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be positive",
        }),
        isActive: joi_1.default.boolean().default(true).messages({
            "boolean.base": "isActive must be a boolean",
        }),
    }),
    files: joi_1.default.object({
        image: joi_1.default.array().items(globalFields.file),
    }).optional(),
};
exports.updateHardwareSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().trim().messages({
            "string.base": "Hardware id must be a string",
        }),
    }),
    body: joi_1.default.object({
        arabic: joi_1.default.object({
            name: joi_1.default.string().trim().messages({
                "string.base": "Arabic name must be a string",
            }),
            description: joi_1.default.string().trim().messages({
                "string.base": "Arabic description must be a string",
            }),
            spec: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().trim().required(),
                value: joi_1.default.string().trim().required(),
            })),
        }),
        english: joi_1.default.object({
            name: joi_1.default.string().trim().messages({
                "string.base": "English name must be a string",
            }),
            description: joi_1.default.string().trim().messages({
                "string.base": "English description must be a string",
            }),
            spec: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().trim().required(),
                value: joi_1.default.string().trim().required(),
            })),
        }),
        enumKey: joi_1.default.string().trim().messages({
            "string.base": "Enum key must be a string",
        }),
        price: joi_1.default.number().positive().messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be positive",
        }),
        isActive: joi_1.default.boolean().messages({
            "boolean.base": "isActive must be a boolean",
        }),
    }),
    files: joi_1.default.object({
        image: globalFields.file,
    }).optional(),
};
exports.deleteHardwareSchema = {
    params: joi_1.default.object({
        id: joi_1.default.string().trim().messages({
            "string.base": "Hardware id must be a string",
        }),
    }),
};
exports.getHardwareSchema = {
    params: joi_1.default.object({
        id: globalFields.id,
    }),
};
//# sourceMappingURL=hardware.schema.js.map