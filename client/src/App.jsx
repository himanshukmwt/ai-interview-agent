import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { currentUser } from "./services/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewPage from "./pages/InterviewPage"
import InterviewHistory from "./pages/InterviewHistory";
import InterviewReport from "./pages/InterviewReport";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem("token");

  if (!token) {
    dispatch(setUserData(null));
    return;
  }
    const getUser=async()=>{
      try{
        const result=await currentUser();
        dispatch(setUserData(result.data));
      }catch(err){
        console.log(err);
        localStorage.removeItem("token");
        dispatch(setUserData(null));
      }
    };
    getUser();
  },[dispatch])
  return (
    <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/verify-otp" element={<VerifyOtp/>}/>
      <Route path="/reset-Password" element={<ResetPassword/>}/>
      <Route path="/interview" element={<InterviewPage/>}/>
      <Route path="/history" element={<InterviewHistory/>}/>
      <Route path="/report/:id" element={<InterviewReport/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App