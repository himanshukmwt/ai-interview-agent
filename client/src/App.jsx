import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
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

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const getUser=async()=>{
      try{
        const result=await currentUser();
        dispatch(setUserData(result.data));
      }catch(err){
        console.log(err);
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
      <Route path="/interview" element={<InterviewPage/>}/>
      <Route path="/history" element={<InterviewHistory/>}/>
      <Route path="/report/:id" element={<InterviewReport/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App