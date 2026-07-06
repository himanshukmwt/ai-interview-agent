import express from 'express';
import isAuth from '../middleware/isAuth.js';
import {upload} from "../middleware/multer.js"
import { analyzeresume,submitAnswer,finishInterview, generateQuestion, getMyInterviews, getInterviewReport } from '../controllers/interviewController.js';

const router=express.Router();

router.post("/generate-questions",isAuth,generateQuestion);
router.post("/resume",isAuth,upload.single("resume"),analyzeresume);

router.post("/submit-answer",isAuth,submitAnswer);
router.post("/finish",isAuth,finishInterview);
router.get("/get-interview",isAuth,getMyInterviews);
router.get("/report/:id",isAuth,getInterviewReport);

export default router;