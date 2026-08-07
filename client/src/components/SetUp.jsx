import { motion } from "motion/react";
import { useState } from "react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import { resumeUPLOAD, startInterview } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import robot from "../assets/robot.png";
import { HiSparkles } from "react-icons/hi";

function SetUp({ onStart }) {
  const userData = useSelector((state) => state.action);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formdata = new FormData();
    formdata.append("resume", resumeFile);

    try {
      const result = await resumeUPLOAD(formdata);
      console.log(result);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);

      setAnalyzing(false);
    } catch (error) {
      console.log(error);
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await startInterview({
        role,
        experience,
        mode,
        resumeText,
        projects,
        skills,
      });
      console.log(result.data);
      if (userData) {
        dispatch(setUserData({ ...userData, credits: result.data.creditLeft }));
      }
      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center  bg-[#F7F6FE] px-4"
    >
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl space-y-1"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mt-2">
            <HiSparkles size={16} className="bg-indigo-100 text-yellow-400 " />
             AI Powered Interview Platform
          </div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900">
            Ace Your Next
            <span className="text-indigo-600">{" "} AI Interview</span>
          </h1>
          <p className="text-md text-gray-500 leading-8 max-w-lg">
            Practice realistic interviews powered by AI. Receive smart follow-up
            questions, instant feedback, and detailed performance analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 items-center">
          
          <div className="space-y-2">
            {[
              {
                icon: <FaUserTie className="text-indigo-600 text-xl" />,
                text: "Resume-based Questions",
              },
              {
                icon: <FaMicrophoneAlt className="text-indigo-600 text-xl" />,
                text: "AI Follow-up Questions",
              },
              {
                icon: <FaChartLine className="text-indigo-600 text-xl" />,
                text: "Performance Dashboard",
              },
            ].map((item, index) => (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 + index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                key={index}
                className="flex items-center gap-4
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-4
                  hover:border-indigo-500
                  hover:shadow-lg
                  transition"
              >
                {item.icon}
                <span className="text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
          <div className="mb-1">
            <img
                src={robot}
                alt="AI Interview"
                className="w-72 mx-auto "
            />
        </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
            bg-white rounded-3xl shadow-xl border border-gray-100 px-8 py-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Interview Setup
          </h2>
          <div className="space-y-3">
            <div className="relative ">
              <FaUserTie className="absolute top-5 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Software Engineer"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2
                  focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className="relative">
              <FaBriefcase className="absolute top-5 left-4 text-gray-400" />
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full py-4 pl-12 pr-4 border border-gray-200 rounded-xl focus:ring-2
                    focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-600 cursor-pointer"
              >
                <option value="Fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-8 years">5-8 years</option>
                <option value="8+ years">8+ years</option>
              </select>
            </div>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full py-4 px-4 border border-gray-200 rounded-xl focus:ring-2
              focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-600 cursor-pointer"
            >
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analysisDone && (
              <motion.div
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:border-indigo-500 transition"
              >
                <FaFileUpload className="text-4xl mx-auto text-indigo-400 mb-3" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="text-gray-500 font-medium ">
                  {resumeFile
                    ? resumeFile.name
                    : "Drag & Drop Resume or Browse Files (Optional)"}
                </p>

                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition cursor-pointer"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}
            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 space-y-2"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Resume Analysis Result
                </h3>
                {projects.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Projects:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {skills.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Skills:</p>
                    <ul className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <li
                          key={i}
                          className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full disabled:bg-gray-400 bg-indigo-600
              hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-md cursor-pointer"
            >
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SetUp;
