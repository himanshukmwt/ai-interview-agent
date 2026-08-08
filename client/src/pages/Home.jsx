import Navbar from "../components/Navbar";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
   Mic,
    TrendingUp,
    Sparkles,
  FileText,
  Target,
  Download,
  Clock,
  BarChart3,
  Lock,
  ArrowRight,
  
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";
import heroImage from "../assets/hero.png";
import dashboard from "../assets/dashboard.png";

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

const features = [
  {
    icon: Sparkles,
    title: "AI Follow-up Questions",
    desc: "Get relevant follow-up questions based on your answers.",
  },
  {
    icon: FileText,
    title: "Resume Based Interview",
    desc: "Personalized questions generated from your uploaded resume.",
  },
  {
    icon: Mic,
    title: "Voice & Tone Analysis",
    desc: "AI analyzes your voice, tone, pace and confidence in real-time.",
  },
  {
    icon: Target,
    title: "Performance Insights",
    desc: "Detailed analysis with scores and actionable improvement tips.",
  },
  {
    icon: Download,
    title: "Download PDF Report",
    desc: "Get a comprehensive interview report to track your progress.",
  },
  {
    icon: Clock,
    title: "Real-time Simulation",
    desc: "Timer based real interview environment to build real confidence.",
  },
  {
    icon: BarChart3,
    title: "History & Analytics",
    desc: "Track your performance over time with beautiful charts and analytics.",
  },
  {
    icon: Lock,
    title: "Multiple Modes",
    desc: "HR Interview, Technical Interview and Confidence Practice modes.",
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
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={14} /> AI Powered Interview Coach
          </span>
 
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight mb-5 text-slate-900">
            Ace Your Next
            <br />
            Interview with <span className="text-indigo-600">AI</span>
          </h1>
 
          <p className="text-slate-500 text-base sm:text-xl leading-relaxed mb-7 max-w-md">
            Realistic mock interviews, intelligent follow-ups, voice analysis
            and actionable feedback to help you crack your dream job.
          </p>
 
          {userData ? (<div className="flex flex-wrap gap-4 mb-8">
            <button onClick={() => {
                  if (!userData) {
                    setShowLogin(true);
                    return;
                  }
                  navigate("/interview");
                }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-7 py-4 rounded-xl transition shadow-sm shadow-indigo-200 cursor-pointer">
              
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
                className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm px-7 py-4 rounded-xl transition cursor-pointer">
              <BarChart size={16} className="text-indigo-600" />
              View Dashboard
            </button>
          </div>
          ):(

              <div>
                <button
                   onClick={()=>{
                        setShowLogin(true);
                        return;
                    }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-xl cursor-pointer  text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2"
                >
                   Get Started <ArrowRight size={22} />
                </button>
              </div>
            )}
            
        </motion.div>
 
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative lg:scale-120"
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


     <section className="py-10 bg-white rounded-3xl">
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


     <section className="py-10 bg-white mt-6 rounded-3xl">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-wide text-indigo-600 mb-2">
            POWERFUL FEATURES
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Everything You Need to Succeed
          </h2>
        </div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
              className="border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-indigo-100 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <f.icon size={17} className="text-indigo-600" />
              </div>
              <h3 className="font-semibold text-sm text-slate-800 mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      <section id="dashboard" className="py-10 bg-white rounded-3xl mt-6">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-wide text-indigo-600 mb-3">
              TRACK &amp; IMPROVE
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4 leading-tight text-slate-900">
              Your Personal
              <br />
              Interview Dashboard
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
              Monitor your progress, strengths, improvement areas and
              interview history in one place.
            </p>
            <button 
            onClick={() => {
              if (!userData) {
                setShowLogin(true);
                return;
              }
              navigate("/dashboard");
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition cursor-pointer">
              Explore Dashboard <ArrowRight size={14} />
            </button>
          </motion.div>
 

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full bg-white shadow-lg border border-slate-100 overflow-hidden lg:scale-150"
          >
            <img
              src={dashboard}
              alt="Interview dashboard preview"
              className="w-full h-auto block "
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
           
          </motion.div>
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
