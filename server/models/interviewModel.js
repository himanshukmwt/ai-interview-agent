import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },

    timeLimit: {
        type: Number, 
        default: 60,
    },

    answer: {
        type: String,
        default: "",
    },

    feedback: {
        type: String,
        default: "",
    },

    score: {
        type: Number,
        default: 0,
    },

    confidence: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },

    communication: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },

    correctness: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
});

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
    question:[questionSchema],
    
},{timestamps:true});