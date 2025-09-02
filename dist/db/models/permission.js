"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const permissionSchema = new mongoose_1.default.Schema({
    name: {
        arabic: {
            type: String,
            required: true,
        },
        english: {
            type: String,
            required: true,
        },
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
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
const permissionModel = mongoose_1.default.model("permission", permissionSchema);
exports.default = permissionModel;
//# sourceMappingURL=permission.js.map