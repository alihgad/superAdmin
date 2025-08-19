import mongoose from "mongoose";

const hardwareSchema = new mongoose.Schema({
    name: {
        arabic: String,
        english: String,
    },
    enumKey: String,
    image: {
        secure_url: String,
        public_id: String,
    },
    description: {
        arabic: String,
        english: String,
    },
    price: Number,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const hardwareModel = mongoose.model("hardware", hardwareSchema);

export default hardwareModel;