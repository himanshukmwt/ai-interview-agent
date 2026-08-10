import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: null,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    credits:{
        type:Number,
        default:5
    },
    resetOtp: {
        type: Number,
    },
    resetOtpExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


const pendingSignupSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: {
        type: String,
        default: null,
  },
  otp: String,
  otpExpiry: {
    type: Date,
    index: true,
    expires: 0
  }
});

const User = mongoose.model('User', userSchema);
const PendingSignup = mongoose.model('PendingSignup',pendingSignupSchema);

export default {
    User,
    PendingSignup
}


