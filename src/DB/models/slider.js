import mongoose from "mongoose";




const SliderSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },

    title: {
        arabic: {
            type: String
        } ,
        english: {type:String}
    },

    content: {
        arabic: {type:String},
        english: {type:String}
    },

    slides: [
        {
            arabic: {
                title: {
                    type: String,

                },
                content: {
                    type: String
                }
            },
            english: {
                title: {
                    type: String,

                },
                content: {
                    type: String
                }
            },
            image: {
                public_id: String,
                secure_url: String
            },
            text:{
                type: String
            }
        }
    ]

});

const SliderModel = mongoose.models.Slider || mongoose.model("Slider", SliderSchema);

export default SliderModel;
