"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hardwareSchema = new mongoose_1.default.Schema({
    arabic: {
        name: String,
        description: String,
        spec: [
            {
                name: String,
                value: String,
            },
        ],
    },
    english: {
        name: String,
        description: String,
        spec: [
            {
                name: String,
                value: String,
            },
        ],
    },
    enumKey: String,
    image: {
        secure_url: String,
        public_id: String,
    },
    price: Number,
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const hardwareModel = mongoose_1.default.model("hardware", hardwareSchema);
exports.default = hardwareModel;
//# sourceMappingURL=hardware.js.map