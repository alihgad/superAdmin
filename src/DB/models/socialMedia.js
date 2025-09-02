import mongoose from "mongoose";


const socialSchema = new mongoose.Schema({

    link: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    icon: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    display: {
        type: Boolean,
        default: false
    }

});



const socialModel = mongoose.models.social || mongoose.model("Social", socialSchema);

export default socialModel;
