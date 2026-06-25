import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUser } from "../controllers/userController.js";

const router=express.Router();

router.get("/current-user",isAuth,getUser);

export default router;