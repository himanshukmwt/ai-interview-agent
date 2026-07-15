import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { setUser } from "../services/authServices.js";
import { OAuth2Client } from "google-auth-library";
import { sendOtpEmail } from "../config/mailer.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const handleUserSignup= async(req, res) =>{
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "user signup successful", name, email });
  } catch (error) {
    console.log(error);
  }
}

export const handleUserLogin= async (req, res)=> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ err: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ err: "Invalid email or password" });
    }

    const token = setUser(user);
    res.cookie("uid", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "user login seccessfull",
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

export const handleUserLogout=async(req,res)=>{
  try{
        res.clearCookie("uid",{
          httpOnly:true
        });

        return res.status(200).json({
            message: "Logged out successfully",
          });
    
      }catch (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
};

export const googleLogin=async(req,res)=>{
  try{
    const {token}=req.body;
    

    const ticket=await client.verifyIdToken({
      idToken:token,
      audience:process.env.GOOGLE_CLIENT_ID
    });

    const payload=ticket.getPayload();

    const{sub:googleId,email,name,picture}=payload;

    let user=await User.findOne({email});

    if(!user){
      user=await User.create({
        name,
        email,
        googleId,
        profilePicture:picture,
        authProvider:"google"
      })
    }
    else if(user && !user.googleId){
      user.googleId=googleId;
      user.authProvider="google";

      await user.save();
    }
  

  const appToken = setUser(user);

  res.cookie("uid", appToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

  res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });

  }catch (error) {
    console.error("Google auth error:", error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};

export const forgetPassword=async(req,res)=>{
  try{
    const {email}=req.body;

    const user=await User.findOne({email});

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const otp=Math.floor(100000+ Math.random() * 900000);
    const otpExpiry=new Date(Date.now()+ 10*60*1000);

    user.resetOtp = otp;
    user.resetOtpExpiry = otpExpiry;
    await user.save();

    await sendOtpEmail(email,otp);
    res.status(200).json({ message: "OTP sent to your email" });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyOtp=async(req,res)=>{
  try{
    const{email,otp}=req.body;

    const user=await User.findOne({email});

    if(!user || !user.resetOtp){
      return res.status(400).json({message:"Invalid request"});
    }

    if(user.resetOtp !== Number(otp)){
      return res.status(400).json({message:"Invalid otp"});
    }

    if(user.resetOtpExpiry <new Date){
      return res.status(400).json("Otp Expired");
    }

    const resetToken=setUser(user);

    return res.status(200).json({
      message:"Otp Verified",
      resetToken,
    });

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



