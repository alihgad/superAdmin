"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.default.Schema({
    price: {
        type: Number,
        required: true,
    },
    arabic: {
        description: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        features: [
            {
                type: String,
            },
        ],
    },
    english: {
        description: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        features: [
            {
                type: String,
            },
        ],
    },
    activeFeatures: [
        {
            type: Number,
            required: true,
        },
    ],
});
const planModel = mongoose_1.default.models.Plan || mongoose_1.default.model("Plan", planSchema);
exports.default = planModel;
//# sourceMappingURL=plan.js.map