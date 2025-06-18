import mongoose from "mongoose";


const socialSchema = new mongoose.Schema({

    link: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    alt:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    display:{
        type: Boolean,
        default: flase
    }

});

const socialModel = mongoose.models.social || mongoose.model("Social", socialSchema);

export default socialModel;
