import jwt from "jsonwebtoken";

export default (roles=[])=>(req, res, next) => {

    if (!req.headers.authorization) {
        return next(new Error("Unauthorized"))
    }

    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return next(new Error("Unauthorized"))
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET)


    req.userId = decoded.id

    if (roles.length > 0 && !roles.includes(decoded.role)) {
        return next(new Error("Unauthorized"))
    }

    next()
}

