import mongoose from "mongoose";




const planSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    features: [
        {
            type : String
        }
    ]

});

const planModel = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default planModel;
