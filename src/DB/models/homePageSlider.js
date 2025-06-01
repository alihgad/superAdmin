import mongoose from "mongoose";




const homePageSliderSchema = new mongoose.Schema({
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

const homePageSliderModel = mongoose.model("homePageSlider", homePageSliderSchema);

export default homePageSliderModel;
