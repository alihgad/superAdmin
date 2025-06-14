import mongoose from "mongoose";




const SliderSchema = new mongoose.Schema({
    page:{
        type : String,
        required : true
    },
    section : {
        type : String,
        required : true
    },

    slides:[
        {
            title : {
                type : String,
                required : true
            },
            content : {
                type : String
            },
            image : {
                public_id : String,
                secure_url : String
            }
        }
    ]

});

const SliderModel = mongoose.models.Slider || mongoose.model("Slider", SliderSchema);

export default SliderModel;
