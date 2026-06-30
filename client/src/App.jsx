import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { currentUser } from "./services/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewPage from "./pages/InterviewPage"

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
      <Route path="/interview" element={<InterviewPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App