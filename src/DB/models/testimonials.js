import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    image: {
        public_id: String,
        secure_url: String
    },
    arabic:{
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    }
    },
    English:{
        text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    }
    }
});

export const testimonialModel = mongoose.model("Testimonial", testimonialSchema);


