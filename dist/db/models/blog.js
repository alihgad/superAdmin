"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.default.Schema({
    image: {
        secure_url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    text: {
        type: String,
        required: true,
    },
    sections: [
        {
            title: {
                arabic: {
                    type: String,
                },
                english: {
                    type: String,
                },
            },
            content: {
                arabic: [
                    {
                        type: String,
                    },
                ],
                english: [
                    {
                        type: String,
                    },
                ],
            },
        },
    ],
});
const blogModel = mongoose_1.default.models.blog || mongoose_1.default.model("blog", blogSchema);
exports.default = blogModel;
//# sourceMappingURL=blog.js.map