"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const footerSchema = new mongoose_1.default.Schema({
    arabic: {
        title: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
    },
    english: {
        title: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
    },
    link: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
});
const footerModel = mongoose_1.default.models.footer || mongoose_1.default.model("Footer", footerSchema);
exports.default = footerModel;
//# sourceMappingURL=footer.js.map