import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendOtpEmail = async(email,otp) => {
    await transporter.sendMail({
        from: `"Interview Prep App" <${process.env.EMAIL_USER}>`,
        to:email,
        subject: "Password reset otp",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6d28d9;">Password Reset Request</h2>

            <p>Use the OTP below to reset your password. This OTP is valid for <b>10 minutes</b>.</p>

            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #f5f3ff; color: #6d28d9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
                ${otp}
            </div>

            <p style="color: #666; font-size: 14px;">
                If you didn't request this, you can safely ignore this email.
            </p>
        </div>
        `
    });
}