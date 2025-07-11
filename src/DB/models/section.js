import mongoose from "mongoose";




const sectionSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true,
        unique: true
    },

    arabic: {
        title: {
            type: String
        },
        content: {
            type: String
        }
    },
    english: {
        title: {
            type: String
        },
        content: {
            type: String
        }
    }

    ,
    images: [
        {
            public_id: {
                type: String
            },
            secure_url: {
                type: String
            }
        }
    ]

});

const sectionModel = mongoose.models.section || mongoose.model("section", sectionSchema);

export default sectionModel;
