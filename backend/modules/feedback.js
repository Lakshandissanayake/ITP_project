const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const feedbackSchema=new Schema({

    email:{
        type:String,
        required:true,
    },

    type:{
        type:String,
        required:true,
    },

    image1:{
        type:String,
        default:null,
    },

    

    date:{
        type:String,
        required:true,
    },

    

    description:{
        type:String,
        required:true,
    }
})

const Feedback=mongoose.model("Feedback",feedbackSchema)

module.exports=Feedback ;