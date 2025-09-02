"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = exports.files = exports.file = void 0;
const joi_1 = require("joi");
const mongoose_1 = require("mongoose");
exports.file = joi_1.default.object({
    fieldname: joi_1.default.string().required(),
    originalname: joi_1.default.string().required(),
    encoding: joi_1.default.string().required(),
    mimetype: joi_1.default.string().required(),
    destination: joi_1.default.string().required(),
    filename: joi_1.default.string().required(),
    path: joi_1.default.string().required(),
    size: joi_1.default.number().required()
});
exports.files = joi_1.default.array().items(exports.file).optional();
const objectIdValidator = (value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};
exports.id = joi_1.default.string().custom(objectIdValidator, 'ObjectId validation').required().messages({
    'any.required': 'ID is required',
    'any.invalid': 'Invalid ID format',
    'string.base': 'ID must be a string',
});
//# sourceMappingURL=globalFields.js.map