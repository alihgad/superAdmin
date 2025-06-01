import mongoose from "mongoose";




const homePageSchema = new mongoose.Schema({
    section : {
        type : String,
        required : true
    },
    title : {
        type : String
    },
    content : {
        type : String
    },
    images : [
        {
            public_id : {
                type : String
            },
            secure_url : {
                type : String
            }
        }
    ]

});

const homePageModel = mongoose.model("homePage", homePageSchema);

export default homePageModel;
