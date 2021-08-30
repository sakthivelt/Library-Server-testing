const mongoose=require('mongoose');

const infoSchema=mongoose.Schema({
    RegNo:{
        type:String,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    Degree:{
        type:String,
        required:true,
    },
    Course:{
        type:String,
        required:true,
    },
    DOB:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    Books: [
        { BookName:{type:String},
         BookId:{type:String},
         Status:{type:Boolean},
        TakeOver:{type:String},
        HandOver:{type:String,} }
    ],
    TimeStamp:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Users",infoSchema)