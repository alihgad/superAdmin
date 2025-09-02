"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.cloudinaryUpload = void 0;
const multer_1 = require("multer");
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
exports.cloudinaryUpload = cloudinary_1.v2;
const storage = multer_1.default.diskStorage({});
exports.upload = (0, multer_1.default)({ storage });
exports.default = exports.upload;
//# sourceMappingURL=multer.js.map