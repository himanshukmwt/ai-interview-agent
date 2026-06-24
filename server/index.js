import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/authRoutes.js";


const app=express();

const PORT=process.env.PORT || 8100;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use("/api/user",userRouter);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
    connectDB()
});