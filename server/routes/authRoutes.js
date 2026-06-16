import express from "express";
import { handleUserSignup ,handleUserLogin} from "../controllers/authController.js";

const router=express.Router();

router.post("/register",handleUserSignup);
router.post("/login",handleUserLogin);

export default router;