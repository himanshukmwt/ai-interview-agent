// pages/VerifyOtp.jsx
import { useState, useRef } from "react";
import { verifyOtp } from "../services/api";

function VerifyOtp({ isModel=false, email, onSuccess, onBack }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage("");
    setLoading(true);
    try {
      const otpValue = otp.join("");
      const res = await verifyOtp({ email, otp: otpValue });
      onSuccess(res.data.resetToken);
    } catch (err) {
      setmessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-gray-100 flex items-center justify-center px-4"}`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium">{email}</span>
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ))}
        </div>

        {message && <p className="text-red-500 text-sm mb-3">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
        type="button"
        onClick={onBack}
        className="w-full mt-3 text-sm text-indigo-600 hover:underline"
      >
        Back
      </button>
      </form>
      
    </div>
  );
}

export default VerifyOtp;
