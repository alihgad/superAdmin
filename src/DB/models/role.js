import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        arabic: {
            type: String,
            required: true,
            unique: true
        },
        english: {
            type: String,
            required: true,
            unique: true
        }
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "permission"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})


const roleModel = mongoose.model("role", roleSchema);

export default roleModel;