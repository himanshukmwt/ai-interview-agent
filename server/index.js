import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/connectDB.js";

const app=express();

const PORT=process.env.PORT || 8100;


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
    connectDB()
});