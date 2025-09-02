"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "غير مصرح - مطلوب token" });
        }
        let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your-secret-key");
        if (!decoded) {
            return res.status(401).json({ message: "غير مصرح - token غير صحيح" });
        }
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "غير مصرح - token غير صحيح" });
    }
};
exports.auth = auth;
const authorize = (roles = []) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "غير مصرح - مطلوب تسجيل دخول" });
    }
    if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res
            .status(403)
            .json({ message: "غير مصرح - لا تملك الصلاحيات المطلوبة" });
    }
    next();
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map