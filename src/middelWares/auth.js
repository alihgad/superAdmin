import jwt from "jsonwebtoken";

export default (req , res , next) => {
    let token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        return next(new Error("Unauthorized"))
    }

    let decoded = jwt.verify(token , process.env.JWT_SECRET)


    req.userId = decoded.id

    next()
}
    
