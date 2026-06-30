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
  const [role,setRole]=useState("");
  const [experience, setExperience]=useState("");
  const [mode,setMode]=useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
const [loading, setLoading] = useState(false);
const [projects, setProjects] = useState([]);
const [skills, setSkills] = useState([]);
const [resumeText, setResumeText] = useState("");
const [analysisDone, setAnalysisDone] = useState(false);
const [analyzing, setAnalyzing] = useState(false);

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

    <motion.div
     initial={{ x: 80,opacity: 0 }}
  animate={{ x:0,opacity: 1 }}
  transition={{ duration: 0.8 }} 
  className="p-12 bg-amber-50"
    >
     <h2 className="font-3xl font-bold text-gray-800 mb-8">
      Interview SetUp
      </h2> 
      <div className="space-y-6">
        <div className="relative">
          <FaUserTie className="absolute top-4 left-4 text-gray-400"/>
          <input type='text' placeholder="Enter role"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none transition"
          onChange={(e)=>setRole(e.target.val)} value={role}/>

        </div>

        <div className="relative">
          <FaBriefcase className="absolute top-4 left-4 text-gray-400"/>
          <input type='text' placeholder="Experience (e.g 3 years)"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none transition"
          onChange={(e)=>setExperience(e.target.val)} value={experience}/>

        </div>

          <select value={mode}
          onChange={(e)=>setMode(e.target.value)}
          className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none transition text-gray-600">
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
          </select>

          {!analysisDone && (
            <motion.div 
              onClick={()=>document.getElementById("resumeUpload").click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:border-blue-100 transition">
                <FaFileUpload className="text-4xl mx-auto text-blue-300 mb-3"/>
                <input type="file" accept="application/pdf" id="resumeUpload" className="hidden"
                  onChange={(e)=>setResumeFile(e.target.files[0])}
                />
                <p className="text-gray-500 font-medium">
                  {resumeFile ? resumeFile.name : "Click to upload resume"}
                </p>
            </motion.div>
          )}
      </div>

    </motion.div>
  </div>
</motion.div>
  )
}

export default SetUp