"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SliderSchema = new mongoose_1.default.Schema({
    page: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    title: {
        arabic: {
            type: String,
        },
        english: { type: String },
    },
    content: {
        arabic: { type: String },
        english: { type: String },
    },
    slides: [
        {
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
            image: {
                public_id: String,
                secure_url: String,
            },
            text: {
                type: String,
            },
        },
    ],
});
const SliderModel = mongoose_1.default.models.Slider || mongoose_1.default.model("Slider", SliderSchema);
exports.default = SliderModel;
//# sourceMappingURL=slider.js.map