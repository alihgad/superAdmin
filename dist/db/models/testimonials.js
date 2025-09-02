"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialModel = void 0;
const mongoose_1 = require("mongoose");
const testimonialSchema = new mongoose_1.default.Schema({
    image: {
        public_id: String,
        secure_url: String,
    },
    arabic: {
        text: {
            type: String,
        },
        name: {
            type: String,
        },
        company: {
            type: String,
        },
    },
    english: {
        text: {
            type: String,
        },
        name: {
            type: String,
        },
        company: {
            type: String,
        },
    },
});
exports.testimonialModel = mongoose_1.default.model("Testimonial", testimonialSchema);
//# sourceMappingURL=testimonials.js.map