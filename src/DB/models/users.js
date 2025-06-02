import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone : {
        type : String,
        required : true
    }
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await this.hashPassword(this.password);
    }
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
