import express from "express";
import { handleUserSignup ,handleUserLogin, handleUserLogout, googleLogin} from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const router=express.Router();

router.post("/register",handleUserSignup);
router.post("/login",handleUserLogin);
router.post("/logout",isAuth,handleUserLogout);
router.post("/google",googleLogin);

export default router;