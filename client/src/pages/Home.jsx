// import Navbar from "../components/Navbar";
// import { useState } from "react";
// import { motion } from "motion/react";
// import {
//   BsRobot,
//   BsMic,
//   BsClock,
//   BsBarChart,
//   BsFileEarmarkText,
// } from "react-icons/bs";
// import { HiSparkles } from "react-icons/hi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import AuthModel from "../components/AuthModel";
// import hrImg from "../assets/HR.png";
// import techImg from "../assets/tech.png";
// import confidenceImg from "../assets/confi.png";
// import creditImg from "../assets/credit.png";
// import evalImg from "../assets/ai-ans.png";
// import resumeImg from "../assets/resume.png";
// import pdfImg from "../assets/pdf.png";
// import analyticsImg from "../assets/history.png";
// import Footer from "../components/Footer";

// function Home() {
//   const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [showLogin, setShowLogin] = useState(false);

//   const array = [
//     {
//       icon: <BsRobot size={24} />,
//       step: "STEP 1",
//       title: "Role  & Experience Selection",
//       desc: "AI adjusts difficulty based on selected job role.",
//     },
//     {
//       icon: <BsMic size={24} />,
//       step: "STEP 2",
//       title: "Smart Voice Interview",
//       desc: "Dynamic follow-up questions based on your answers.",
//     },
//     {
//       icon: <BsClock size={24} />,
//       step: "STEP 3",
//       title: "Timer based Simulation",
//       desc: "Real interview pressure with time .",
//     },
//   ];

//   const images = [
//     {
//       image: evalImg,
//       icon: <BsBarChart size={20} />,
//       title: "AI Answer Evaluation",
//       desc: "Scores communication, technical accuracy and confidence.",
//     },
//     {
//       image: resumeImg,
//       icon: <BsFileEarmarkText size={20} />,
//       title: "Resume Based Interview",
//       desc: "Project-specific questions based on uploaded resume.",
//     },
//     {
//       image: pdfImg,
//       icon: <BsFileEarmarkText size={20} />,
//       title: "Downloadable PDF Report",
//       desc: "Detailed strengths, weaknesses and improvement insights.",
//     },
//     {
//       image: analyticsImg,
//       icon: <BsBarChart size={20} />,
//       title: "History & Analytics",
//       desc: "Track progress with performance graphs and topic analysis.",
//     },
//   ];
//   return (
//     <div className="min-h-screen bg-amber-50 flex flex-col">
//       <Navbar />

//       <div className="flex-1 px-6 pt-10 pb-20">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex justify-center mb-6">
//             <div className="bg-gray-100 text-gray-700 text-base px-4 py-2 rounded-full flex items-center gap-2">
//               <HiSparkles size={16} className="bg-green-50 text-green-600" />
//               AI Powered Smart Interview Platform
//             </div>
//           </div>
//           <div className="text-center mb-28">
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
//             >
//               Practice Interviews with{" "}
//               <span className="relative inline-block">
//                 <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
//                   AI Intelligence
//                 </span>
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               className="text-gray-500 mt-6 mex-w-2xl mx-auto text-lg"
//             >
//               Master real-world interviews with AI-powered mock sessions,
//               intelligent follow-up questions, adaptive difficulty, and instant
//               performance feedback.
//             </motion.p>

//             <div className="flex flex-wrap justify-center gap-4 mt-10">
//               <motion.button
//                 onClick={() => {
//                   if (!userData) {
//                     setShowLogin(true);
//                     return;
//                   }
//                   navigate("/interview");
//                 }}
//                 whileHover={{ opacity: 0.9, scale: 1.05 }}
//                 whileTap={{ opacity: 1, scale: 0.98 }}
//                 className="bg-gray-800 text-white px-10 py-3 rounded-full hover:opacity-80 transition shadow-md cursor-pointer"
//               >
//                 Start Interview
//               </motion.button>
//               <motion.button
//                 onClick={() => {
//                   if (!userData) {
//                     setShowLogin(true);
//                     return;
//                   }
//                   navigate("/history");
//                 }}
//                 whileHover={{ opacity: 0.9, scale: 1.05 }}
//                 whileTap={{ opacity: 1, scale: 0.98 }}
//                 className="border border-gray-200 px-10 py-3 rounded-full hover:bg-gray-300 transition cursor-pointer"
//               >
//                 View History
//               </motion.button>
//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
//             {array.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 + index * 0.2 }}
//                 whileHover={{ rotate: 0, scale: 1.06 }}
//                 className={`
//                   relative bg-gray-100 rounded-3xl border-2 border-green-100
//                   hover:border-green-500 p-10 w-80 max-w-[90%] shadow-md
//                   hover:shadow-2xl transition-all duration-300
//                   ${index === 0 ? "rotate-[-4deg]" : ""}
//                   ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""}
//                   ${index === 2 ? "rotate-[-3deg]" : ""}
//                 `}
//               >
//                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
//                   {item.icon}
//                 </div>

//                 <div className="pt-10 text-center">
//                   <div className="text-xs text-green-600 font-semibold mb-2 tracking-wider">
//                     {item.step}
//                   </div>

//                   <h3 className="font-semibold mb-3 text-lg">{item.title}</h3>

//                   <p className="text-sm text-gray-500 leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mb-32">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-4xl font-semibold text-center mb-16"
//             >
//               Advanced AI <span className="text-green-600">Capabilities</span>
//             </motion.h2>
//             <div className="grid md:grid-cols-2 gap-10">
//               {images.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.02 }}
//                   className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all"
//                 >
//                   <div className="flex flex-col md:flex-row items-center gap-8">
//                     <div className="w-full md:w-1/2 flex justify-center">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-auto object-contain max-h-64"
//                       />
//                     </div>

//                     <div className="w-full md:w-1/2">
//                       <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
//                         {item.icon}
//                       </div>

//                       <h3 className="font-semibold mb-3 text-xl">
//                         {item.title}
//                       </h3>

//                       <p className="text-gray-300 text-sm leadin-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//           <div className="mb-32">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-4xl font-semibold text-center mb-16"
//             >
//               Multiple Interview <span className="text-green-600">Modes</span>
//             </motion.h2>
//             <div className="grid md:grid-cols-2 gap-10">
//               {[
//                 {
//                   img: hrImg,
//                   title: "HR Interview Mode",
//                   desc: "Behavioral and communication based evaluation.",
//                 },
//                 {
//                   img: techImg,
//                   title: "Technical Mode",
//                   desc: "Deep technical questioning based on selected role.",
//                 },
//                 {
//                   img: confidenceImg,
//                   title: "Confidence Detection",
//                   desc: "Basic tone and voice analysis insights.",
//                 },
//                 {
//                   img: creditImg,
//                   title: "Credits System",
//                   desc: "Unlock premium interview sessions.",
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.02 }}
//                   className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl p-8 transition-all"
//                 >
//                   <div className="flex flex-col md:flex-row items-center gap-6">
//                     <div className="w-1/2">
//                       <h3 className="font-semibold mb-3 text-xl">
//                         {item.title}
//                       </h3>

//                       <p className="text-gray-300 text-sm leadin-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                     <div className="w-1/2 flex justify-end">
//                       <img
//                         src={item.img}
//                         alt={item.title}
//                         className="w-28 h-28 object-contain max-h-64"
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       {showLogin && <AuthModel onClose={() => setShowLogin(false)} />}
//       <Footer/>
//     </div>
//   );
// }

// export default Home;



import Navbar from "../components/Navbar";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
   Mic,
    TrendingUp,
    Sparkles,
  
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";
import heroImage from "../assets/hero.png";

import Footer from "../components/Footer";
import { BarChart } from "recharts";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  
const steps = [
  {
    icon: Briefcase,
    num: "01",
    title: "Choose Your Role",
    desc: "Select job role, experience level and interview mode.",
  },
  {
    icon: Mic,
    num: "02",
    title: "AI Interview Session",
    desc: "Answer questions with voice. AI asks smart follow-ups based on your responses.",
  },
  {
    icon: TrendingUp,
    num: "03",
    title: "Get Feedback & Improve",
    desc: "Receive detailed feedback and track your performance.",
  },
];

function DottedArrow() {
  return (
    <div className="hidden md:flex items-center absolute top-1/2 -right-10 -translate-y-1/2">
      <div className="w-14 border-t-[3px] border-dashed border-indigo-400"></div>

      <div className="w-3 h-3 border-t-[3px] border-r-[3px] border-indigo-500 rotate-45 -ml-1"></div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-[#F7F6FE] flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 pt-5 pb-20">
        <div className="max-w-7xl mx-auto">
          
           <section className="relative overflow-hidden bg-transparent">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full  blur-3xl opacity-60" />
 
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-5 pb-20 grid lg:grid-cols-2 gap-12 items-center relative">
        

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={12} /> AI Powered Interview Coach
          </span>
 
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-5 text-slate-900">
            Ace Your Next
            <br />
            Interview with <span className="text-indigo-600">AI</span>
          </h1>
 
          <p className="text-slate-500 text-base leading-relaxed mb-7 max-w-md">
            Realistic mock interviews, intelligent follow-ups, voice analysis
            and actionable feedback to help you crack your dream job.
          </p>
 
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => {
                  if (!userData) {
                    setShowLogin(true);
                    return;
                  }
                  navigate("/interview");
                }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-sm shadow-indigo-200 cursor-pointer">
              
              Start Interview
            </button>
            <button 
            onClick={() => {
              if (!userData) {
                setShowLogin(true);
                return;
              }
              navigate("/dashboard");
              }}
                className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl transition cursor-pointer">
              <BarChart size={16} className="text-indigo-600" />
              View Dashboard
            </button>
          </div>
            
        </motion.div>
 
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="relative pt-10 px-10 min-h-[420px] overflow-hidden">
            <img
              src={heroImage}
              alt="AI Interview"
              className="w-full max-w-lg mx-auto"
            />
            
          </div>
        </motion.div>
      </div>
    </section>


     <section className="py-10 bg-gray-50 rounded-3xl">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-wide text-indigo-600 mb-2">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Simple Steps to Success
          </h2>
        </div>
 
        <div className="grid md:grid-cols-3 gap-11">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative "
            >
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <s.icon size={18} className="text-indigo-600" />
                  </div>
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold flex items-center justify-center">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1.5">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
 
              {i < steps.length - 1 && <DottedArrow />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
         
          
        </div>
      </div>
      {showLogin && <AuthModel onClose={() => setShowLogin(false)} />}
      <Footer/>
    </div>
  );
}

export default Home;
