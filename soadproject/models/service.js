const mongoose=require('mongoose')
const Farmer=require("../models/farmer");
const serviceschema=mongoose.Schema({
    crop:{
        type:String,
        required:true,


    },
    price:{
        type:Number,
        required:true,


    },
    quantity:{
        type:Number,
        required:true,


    },
    pesticide:{
        type:String,
        required:true,


    },
   
});
module.exports=mongoose.model('service',serviceschema);