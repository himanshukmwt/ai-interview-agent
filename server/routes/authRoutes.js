import express from "express";
import { handleUserSignup ,handleUserLogin, handleUserLogout, googleLogin, forgotPassword, verifyOtp, resetPassword} from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";
import rateLimit from "express-rate-limit";
import { validate } from "../middleware/validate.js";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema
} from "../validators/authValidator.js";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

const router=express.Router();

router.post("/register",validate(registerSchema),handleUserSignup);
router.post("/login",authLimiter,validate(loginSchema),handleUserLogin);
router.post("/logout",isAuth,handleUserLogout);
router.post("/google",googleLogin);
router.post("/forgot-password",authLimiter,validate(forgotPasswordSchema),forgotPassword);
router.post("/verify-otp",authLimiter,validate(verifyOtpSchema),verifyOtp);
router.post("/reset-password",validate(resetPasswordSchema),resetPassword);

export default router;