import dotenv from "dotenv";
dotenv.config();
import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const sendOtpEmail = async (email, otp) => {
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      subject: "Your InterviewPrep OTP",

      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6d28d9;">Verification OTP</h2>

            <p>Use the OTP below to verify email. This OTP is valid for <b>10 minutes</b>.</p>

            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #f5f3ff; color: #6d28d9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
                ${otp}
            </div>

            <p style="color: #666; font-size: 14px;">
                If you didn't request this, you can safely ignore this email.
            </p>
        </div>
        `,

      sender: {
        name: "InterviewPrep",
        email: process.env.BREVO_EMAIL,
      },

      to: [
        {
          email: email,
        },
      ],
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.log("Brevo error:", error);
    throw error;
  }
};
