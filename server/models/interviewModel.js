import mongoose from 'mongoose';

const interviewSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    mode:{
        type:String,
        enum:["HR", "Technical"],
        required:true,
    },
    resumeText:{
        type:String,
    },
    
},{timestamps:true});