import express from 'express';
import isAuth from '../middleware/isAuth.js';
import {upload} from "../middleware/multer.js"
import { analyzeresume,generateQuestion,submitAnswer,finishInterview } from '../controllers/interviewController.js';


const router=express.Router();

router.post("/resume",isAuth,upload.single("resume"),analyzeresume);
router.post("/generate-questions",isAuth,generateQuestion);
router.post("/submit-answer",isAuth,submitAnswer);
router.post("/finish",isAuth,finishInterview);

export default router;