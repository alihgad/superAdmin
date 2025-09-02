"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const lecinceSchema = new mongoose_1.default.Schema({
    name: {
        arabic: {
            type: String,
        },
        english: {
            type: String,
        },
    },
    enumKey: String,
    price: Number,
    isActive: {
        type: Boolean,
        default: true,
    },
});
const lecinceModel = mongoose_1.default.model("lecince", lecinceSchema);
exports.default = lecinceModel;
//# sourceMappingURL=lecince.js.map