import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import {FaTimes} from 'react-icons/fa'
import Login from "../pages/Login";
import Register from "../pages/register";
import ForgotPassword from "../pages/ForgotPassword";


function AuthModel({onClose}) {
    const userData=useSelector((state)=>state.action);
    const [view, setView] = useState("login");
    const [email, setEmail] = useState("");

    useEffect(()=>{
        if(userData){
            onClose();
        }
    },[userData,onClose]);
  return (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/10 backdrop-blur-sm px-4">
    <div className="relative w-full max-w-md">
      <button onClick={onClose} className="absolute top-8 right-5 text-gray-800 hover:text-black text-xl cursor-pointer">
        <FaTimes size={16} />
      </button>

      {view === "login" && (
          <Login isModel={true} 
            onSwitchToRegister={() => setView("register")}
            onForgotPassword={() => setView("forgot-password")} />
        ) } 

      {view === "register" && (
          <Register isModel={true} onSwitchToLogin={() => setView("login")} />
        )}

      {view === "forgot-password" && (
        <ForgotPassword
          isModel={true}
            onSuccess={(email) => {
                setEmail(email);
                setView("otp");
            }}
        />
    )}
      
     
    </div>
  </div>
);
}

export default AuthModel