import mongoose from "mongoose";

const hardwareSchema = new mongoose.Schema({
    arabic: {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        }
    }
})

const hardwareModel = mongoose.model("hardware", hardwareSchema);

export default hardwareModel;