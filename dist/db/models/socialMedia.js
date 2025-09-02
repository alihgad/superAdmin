"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const socialSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    display: {
        type: Boolean,
        default: false,
    },
});
const socialModel = mongoose_1.default.models.social || mongoose_1.default.model("Social", socialSchema);
exports.default = socialModel;
//# sourceMappingURL=socialMedia.js.map