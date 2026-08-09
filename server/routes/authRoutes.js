import express from "express";
import { handleUserSignup ,handleUserLogin, handleUserLogout, googleLogin, forgotPassword, verifyOtp, resetPassword} from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";
import rateLimit from "express-rate-limit";


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

const router=express.Router();

router.post("/register",handleUserSignup);
router.post("/login",authLimiter,handleUserLogin);
router.post("/logout",isAuth,handleUserLogout);
router.post("/google",googleLogin);
router.post("/forgot-password",authLimiter,forgotPassword);
router.post("/verify-otp",authLimiter,verifyOtp);
router.post("/reset-password",resetPassword);

export default router;