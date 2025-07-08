import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    image: {
        public_id: String,
        secure_url: String
    },
    arabic: {
        text: {
            type: String,
        },
        name: {
            type: String,
        },
        company: {
            type: String,
        }
    },
    english: {
        text: {
            type: String,
        },
        name: {
            type: String,
        },
        company: {
            type: String,
        }
    }
});

export const testimonialModel = mongoose.model("Testimonial", testimonialSchema);


