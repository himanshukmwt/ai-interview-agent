import dotenv from "dotenv";
dotenv.config();
import express from "express";

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./config/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import interviewRouter from "./routes/interviewRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js"
import cookieParser from "cookie-parser";

const app=express();

app.set("trust proxy", 1);

app.use(helmet());

const PORT=process.env.PORT || 8100;
app.use(
  cors({
    //  origin: "http://localhost:5173",
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100,                
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(generalLimiter);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({extended:true, limit: "1mb"}));
app.use(cookieParser());


app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/interview",interviewRouter);
app.use("/api/dashboard",dashboardRouter);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
    connectDB()
});