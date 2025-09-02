import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "غير مصرح - مطلوب token" });
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

        if (!decoded) {
            return res.status(401).json({ message: "غير مصرح - token غير صحيح" });
        }

        
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "غير مصرح - token غير صحيح" });
    }
};

export const authorize = (roles = []) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "غير مصرح - مطلوب تسجيل دخول" });
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "غير مصرح - لا تملك الصلاحيات المطلوبة" });
    }

    next();
};

