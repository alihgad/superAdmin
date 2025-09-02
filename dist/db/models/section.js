"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sectionSchema = new mongoose_1.default.Schema({
    page: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
        unique: true,
    },
    arabic: {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    english: {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    images: [
        {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
    ],
});
const sectionModel = mongoose_1.default.models.section || mongoose_1.default.model("section", sectionSchema);
exports.default = sectionModel;
//# sourceMappingURL=section.js.map