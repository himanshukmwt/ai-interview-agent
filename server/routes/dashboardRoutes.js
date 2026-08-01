import isAuth from "../middleware/isAuth.js";
import express from "express";
import { analytics } from "../controllers/dashboardController.js";


const router=express.Router();

router.get("/",isAuth,analytics);

export default router;