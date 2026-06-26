import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controllers/userController.js";

const router=express.Router();

router.get("/current-user",isAuth,getCurrentUser);

export default router;