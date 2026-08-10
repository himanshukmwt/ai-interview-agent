import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";

function AuthModel({ onClose }) {
  const {userData} = useSelector((state) => state.user);
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken]=useState("");
  const [otpMode, setOtpMode] = useState(null);

  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-8 right-5 text-gray-800 hover:text-black text-xl cursor-pointer"
        >
          <FaTimes size={16} />
        </button>

        {view === "login" && (
          <Login
            isModel={true}
            onClose={onClose}
            onSwitchToRegister={() => setView("register")}
            onForgotPassword={() => setView("forgot-password")}
          />
        )}

        {view === "register" && (
          <Register isModel={true} onSuccess={(email) => {
              setEmail(email);
              setOtpMode("signup");
              setView("verify-otp");
            }}
            onSwitchToLogin={() => setView("login")} />
        )}

        {view === "forgot-password" && (
          <ForgotPassword
            isModel={true}
            onSuccess={(email) => {
              setEmail(email);
               setOtpMode("forgot-password");
              setView("verify-otp");
            }}
            onBack={()=>setView("login")}
          />
        )}
        {/* {view === "verify-otp" && (
          <VerifyOtp
          isModel={true}
            email={email}
            onBack={() => setView("forgot-password")}
            onSuccess={(token) => {
              setResetToken(token);
              setView("reset-password");
            }}
          />
        )} */}

        {view === "verify-otp" && (
  <VerifyOtp
    isModel={true}
    email={email}
    mode={otpMode}
    onBack={() =>
      setView(
        otpMode === "signup"
          ? "register"
          : "forgot-password"
      )
    }
    onSuccess={(data) => {
      if (otpMode === "signup") {
        setView("login");
      } else {
        setResetToken(data);
        setView("reset-password");
      }
    }}
  />
)}

        {view === "reset-password" && (
          <ResetPassword
          isModel={true}
            resetToken={resetToken}
            onBack={() => setView("forgot-password")}
            onSuccess={() => setView("login")}
          />
        )}
      </div>
    </div>
  );
}

export default AuthModel;
