import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { setUser } from "../services/authServices.js";

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