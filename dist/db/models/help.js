"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helpSchema = new mongoose_1.default.Schema({
    article: {
        arabic: {
            type: String,
        },
        english: {
            type: String,
        },
    },
    arabic: {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        steps: [
            {
                type: String,
            },
        ],
    },
    english: {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        steps: [
            {
                type: String,
            },
        ],
    },
    image: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    cover: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    vedio: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
});
const helpModel = mongoose_1.default.models.help || mongoose_1.default.model("help", helpSchema);
exports.default = helpModel;
//# sourceMappingURL=help.js.map