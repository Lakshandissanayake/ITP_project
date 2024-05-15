const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const petSchema=new Schema({

  
   name:{
        type:String,
        required:true,
    },

    age:{
        type:Number,
        required:true,
    },

    gender:{
        type:String,
        required:true,
    },
    breed:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        required:true,
    },
    photo:{
        type:String,
        default:null,
    },
})

const pet=mongoose.model("Pet",petSchema)

module.exports=pet ;   