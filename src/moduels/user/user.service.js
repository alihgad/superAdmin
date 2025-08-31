import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { userModel } from "../../DB/models/user.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendResetPasswordEmail, sendWelcomeEmail, sendPasswordChangedEmail } from "../../utils/emailService.js";


export const createUser = async (req, res, next) => {
    const { email, password, name, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        createdBy: req.user?.userId || "system"
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // try {
    //     await sendWelcomeEmail(email, name);
    // } catch (error) {
    //     console.error("Error sending welcome email:", error);
    // }

    return res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword
    });
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;


    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Email or password is incorrect");
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Email or password is incorrect");
    }


    const token = jwt.sign(
        { userId: user._id, email: user.email, createdBy: user.createdBy },
        process.env.JWT_SECRET || "your-secret-key"
    );


    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword,
        token
    });
};


export const getAllUsers = async (req, res, next) => {

    const users = await userModel.find().select("-password");

    return res.status(200).json({
        message: "Users fetched successfully",
        users
    });
};


export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    
    const user = await userModel.findById(id).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return res.status(200).json({
        message: "User fetched successfully",
        user
    });
};


export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { 
            name, 
            email, 
            role,
            updatedAt: new Date()
        },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
    });
};


export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new Error("User not found");
    }
    return res.status(200).json({
        message: "User deleted successfully"
    });
};


export const getUserStats = async (req, res, next) => {
    const totalUsers = await userModel.countDocuments();
    
    const createdByStats = await userModel.aggregate([
        {
            $group: {
                _id: "$createdBy",
                count: { $sum: 1 }
            }
        }
    ]);

    return res.status(200).json({
        message: "User stats fetched successfully",
        totalUsers,
        createdByStats
    })  ;
};

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Email not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const emailSent = await sendResetPasswordEmail(email, resetToken);
    if (!emailSent) {
        throw new Error("Failed to send email");
    }

    return res.status(200).json({
        message: "Password reset link sent to your email"
    });
};

export const resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error("Invalid or expired password reset link");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = new Date();
    await user.save();

    try {
        await sendPasswordChangedEmail(user.email, user.name);
    } catch (error) {
        console.error("Error sending password changed email:", error);
    }

    return res.status(200).json({
        message: "Password reset successfully"
    });
};

export const changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user.userId);
    if (!user) {
        throw new Error("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    await user.save();

    try {
        await sendPasswordChangedEmail(user.email, user.name);
    } catch (error) {
        console.error("Error sending password changed email:", error);
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
        message: "Password changed successfully",
        user: userWithoutPassword
    });
}; 
