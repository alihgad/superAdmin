import mongoose from "mongoose";




const sectionSchema = new mongoose.Schema({
    page:{
        type : String,
        required : true
    },
    section : {
        type : String,
        required : true,
        unique : true
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

const homePageModel = mongoose.models.section || mongoose.model("section", sectionSchema);

export default homePageModel;
