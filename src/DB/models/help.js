import mongoose from "mongoose";




const helpSchema = new mongoose.Schema({
    article:{
        type : String,
        required: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    steps: [
        {
            type: String,
            required: true
        }
    ],
    
    image:{
        public_id : {
            type : String,
            required:true
        },
        secure_url : {
            type : String,
            required:true
        }
    },

    vedio :{
        public_id : {
            type : String,
            required:true
        },
        secure_url : {
            type : String,
            required:true
        }
    }

});

const  helpModel = mongoose.models.help || mongoose.model("help", helpSchema);

export default helpModel;
