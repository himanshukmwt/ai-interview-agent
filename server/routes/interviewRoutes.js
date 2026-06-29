import express from 'express';
import isAuth from '../middleware/isAuth.js';
import {upload} from "../middleware/multer.js"
import { analyzeresume } from '../controllers/interviewController.js';


const router=express.Router();

router.post("/resume",isAuth,upload.single("resume"),analyzeresume);

export default router;