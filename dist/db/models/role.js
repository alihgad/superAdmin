"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.default.Schema({
    name: {
        arabic: {
            type: String,
            required: true,
            unique: true,
        },
        english: {
            type: String,
            required: true,
            unique: true,
        },
    },
    permissions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "permission",
        },
    ],
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true,
});
const roleModel = mongoose_1.default.model("role", roleSchema);
exports.default = roleModel;
//# sourceMappingURL=role.js.map