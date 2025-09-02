"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSliderSchema = exports.addSectionSchema = void 0;
const joi_1 = require("joi");
const globalFields = require("../../utils/globalFields");
exports.addSectionSchema = {
    body: joi_1.default.object({
        arabic: joi_1.default.object({
            title: joi_1.default.string().allow('', null),
            content: joi_1.default.string().allow('', null)
        }).optional(),
        english: joi_1.default.object({
            title: joi_1.default.string().allow('', null),
            content: joi_1.default.string().allow('', null)
        }).optional(),
    }),
    files: globalFields.files.optional(),
    params: joi_1.default.object({
        page: joi_1.default.string().required(),
        section: joi_1.default.string().required(),
    }).optional()
};
exports.createSliderSchema = {
    body: joi_1.default.object({
        arabic: joi_1.default.object({
            title: joi_1.default.string().allow("").optional(),
            content: joi_1.default.string().allow("").optional()
        }).optional(),
        english: joi_1.default.object({
            title: joi_1.default.string().allow("").optional(),
            content: joi_1.default.string().allow("").optional()
        }).optional(),
        title: joi_1.default.object({
            arabic: joi_1.default.string().allow("").optional(),
            english: joi_1.default.string().allow("").optional(),
        }),
        content: joi_1.default.object({
            arabic: joi_1.default.string().allow("").optional(),
            english: joi_1.default.string().allow("").optional(),
        }),
        text: joi_1.default.string().allow("").optional()
    })
};
//# sourceMappingURL=section.schema.js.map