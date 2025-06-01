import User from "../../DB/models/users.js";
import jwt from "jsonwebtoken";

export let  addUser = async (req, res,next) => {
    console.log(req.body);
    
        let {name , email , password , phone} = req.body;
        
        if(!name || !email || !password || !phone){
            return next(new Error("All fields are required name , email , password , phone"))
        }

        let user = await User.findOne({email})

        if(user){
            return next(new Error("User already exists"))
        }

        let newUser = new User({
            name,
            email,
            password,
            phone
        })

        await newUser.save()

        return res.status(201).json({message : "User added successfully"})
}


export let login = async (req, res,next) => {
    let {email , password} = req.body;
    
    if(!email || !password){
        return next(new Error("All fields are required"))
    }

    let user = await User.findOne({email})

    if(!user){
        return next(new Error("User not found"))
    }

    let isMatch = await user.comparePassword(password)

    if(!isMatch){
        return next(new Error("Invalid password"))
    }

    let token = jwt.sign({id : user._id}, process.env.JWT_SECRET)

    return res.status(200).json({message : "User logged in successfully" , token})
}


export let updateUser = async (req, res,next) => {
    let {name , email  , phone} = req.body;
    
    if(!name || !email  || !phone){
        return next(new Error("All fields are required"))
    }

    let user = await User.findOne({_id : req.params.id})

    if(!user){
        return next(new Error("User not found"))
    }

    user.name = name;
    user.email = email;
    user.phone = phone;

    await user.save()

    return res.status(200).json({message : "User updated successfully"})
} 

export let updatePassword = async (req, res,next) => {
    let {password , newPassword} = req.body;
    
    if(!password || !newPassword){
        return next(new Error("All fields are required"))
    }

    let user = await User.findOne({_id : req.params.id})

    if(!user){
        return next(new Error("User not found"))
    }

    let isMatch = await user.comparePassword(password)

    if(!isMatch){
        return next(new Error("Invalid password"))
    }

    user.password = newPassword;

    await user.save()

    return res.status(200).json({message : "User password updated successfully"})
}