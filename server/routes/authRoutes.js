import express from "express";
import { handleUserSignup ,handleUserLogin, handleUserLogout, googleLogin, forgetPassword, verifyOtp, resetPassword} from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const router=express.Router();

router.post("/register",handleUserSignup);
router.post("/login",handleUserLogin);
router.post("/logout",isAuth,handleUserLogout);
router.post("/google",googleLogin);
router.post("/forget-password",forgetPassword);
router.post("/verify-otp",verifyOtp);
router.post("/reset-password",resetPassword);

export default router;