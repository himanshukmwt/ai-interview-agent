import {motion} from "motion/react";
import { useState } from "react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";

function SetUp({onStart}) {
  const [role,setrole]=useState("");
  const [experience, setExperience]=useState("");
  const [mode,setMode]=useState("Technical");

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
>
  <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
    <motion.div 
     initial={{ x: -80,opacity: 0 }}
  animate={{ x:0,opacity: 1 }}
  transition={{ duration: 0.6 }}
    className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-12 flex flex-col justify-center">

      <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Start Your AI Interview
      </h2>
      <p className="text-gray-600 mb-10">
      Master real-world interview scenarios with AI. Sharpen your communication, technical expertise, and confidence to ace every interview.

      </p>
      <div className="space-y-5">
        {
        [
  {
    icon: <FaUserTie className="text-purple-800 text-xl" />,
    text: "Choose Role & Experience",
  },
  {
    icon: <FaMicrophoneAlt className="text-purple-800 text-xl" />,
    text: "Smart Voice Interview",
  },
  {
    icon: <FaChartLine className="text-purple-800 text-xl" />,
    text: "Performance Analytics",
  },
].map((item,index)=>(
  <motion.div
  initial={{ y: 30,opacity: 0 }}
  animate={{ y:0,opacity: 1 }}
  transition={{ duration: 0.4+index*0.2 }} 
  whileHover={{ scale: 1.03 }}
     key={index} className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer">
      {item.icon}
      <span className="text-gray-700 font-medium">{item.text}</span>

  </motion.div>
))
}
      </div>
    </motion.div>


  </div>
</motion.div>
  )
}

export default SetUp