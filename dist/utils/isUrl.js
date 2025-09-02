"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isHttpUrl;
function isHttpUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    }
    catch (_) {
        return false;
    }
}
//# sourceMappingURL=isUrl.js.map