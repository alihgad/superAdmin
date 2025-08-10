import mongoose from "mongoose";




const helpSchema = new mongoose.Schema({
    article: {
        arabic: {
            type: String
        },
        english: {
            type: String
        }
    },
    arabic: {
        title: {
            type: String
        },
        content: {
            type: String
        },
        steps: [
            {
                type: String,

            }
        ]
    }
    ,
    english: {
        title: {
            type: String
        },
        content: {
            type: String
        },
        steps: [
            {
                type: String,

            }
        ]
    }
    ,

    image: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },

    vedio: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    }

});

const helpModel = mongoose.models.help || mongoose.model("help", helpSchema);

export default helpModel;






