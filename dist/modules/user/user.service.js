"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.resetPassword = exports.forgotPassword = exports.getUserStats = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.createUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const crypto_1 = require("crypto");
const user_1 = require("../../db/models/user");
const asyncHandler_1 = require("../../utils/asyncHandler");
const emailService_1 = require("../../utils/emailService");
const createUser = async (req, res, next) => {
    const { email, password, name, role } = req.body;
    const existingUser = await user_1.userModel.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 12);
    const user = await user_1.userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        createdBy: req.user?.userId || "system",
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
        user: userWithoutPassword,
    });
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_1.userModel.findOne({ email });
    if (!user) {
        throw new Error("Email or password is incorrect");
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Email or password is incorrect");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, createdBy: user.createdBy }, process.env.JWT_SECRET || "your-secret-key");
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword,
        token,
    });
};
exports.loginUser = loginUser;
const getAllUsers = async (req, res, next) => {
    const users = await user_1.userModel.find().select("-password");
    return res.status(200).json({
        message: "Users fetched successfully",
        users,
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const user = await user_1.userModel.findById(id).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return res.status(200).json({
        message: "User fetched successfully",
        user,
    });
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const updatedUser = await user_1.userModel
        .findByIdAndUpdate(id, {
        name,
        email,
        role,
        updatedAt: new Date(),
    }, { new: true, runValidators: true })
        .select("-password");
    if (!updatedUser) {
        throw new Error("User not found");
    }
    return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await user_1.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new Error("User not found");
    }
    return res.status(200).json({
        message: "User deleted successfully",
    });
};
exports.deleteUser = deleteUser;
const getUserStats = async (req, res, next) => {
    const totalUsers = await user_1.userModel.countDocuments();
    const createdByStats = await user_1.userModel.aggregate([
        {
            $group: {
                _id: "$createdBy",
                count: { $sum: 1 },
            },
        },
    ]);
    return res.status(200).json({
        message: "User stats fetched successfully",
        totalUsers,
        createdByStats,
    });
};
exports.getUserStats = getUserStats;
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await user_1.userModel.findOne({ email });
    if (!user) {
        throw new Error("Email not found");
    }
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();
    const emailSent = await (0, emailService_1.sendResetPasswordEmail)(email, resetToken);
    if (!emailSent) {
        throw new Error("Failed to send email");
    }
    return res.status(200).json({
        message: "Password reset link sent to your email",
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const user = await user_1.userModel.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new Error("Invalid or expired password reset link");
    }
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = new Date();
    await user.save();
    try {
        await (0, emailService_1.sendPasswordChangedEmail)(user.email, user.name);
    }
    catch (error) {
        console.error("Error sending password changed email:", error);
    }
    return res.status(200).json({
        message: "Password reset successfully",
    });
};
exports.resetPassword = resetPassword;
const changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const user = await user_1.userModel.findById(req.user.userId);
    if (!user) {
        throw new Error("User not found");
    }
    const isCurrentPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
    }
    const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 12);
    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    await user.save();
    try {
        await (0, emailService_1.sendPasswordChangedEmail)(user.email, user.name);
    }
    catch (error) {
        console.error("Error sending password changed email:", error);
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return res.status(200).json({
        message: "Password changed successfully",
        user: userWithoutPassword,
    });
};
exports.changePassword = changePassword;
//# sourceMappingURL=user.service.js.map