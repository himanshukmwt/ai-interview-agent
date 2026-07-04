import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import { motion } from "motion/react";
import Timer from "./Timer";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

function Interview({ interviewData, onFinish }) {
  const {interviewId, questions,userName}=interviewData;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 via-white to-purple-300 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* video section */}
        <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video src={femaleVideo} className="w-full h-auto object-cover" />
          </div>

          {/* timer */}
          <div className="w-full max-w-md bg-white border border-gary-200 rounded-2xl shadow-md p-6 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Interview Status</span>
              <span className="text-sm font-semibold text-indigo-400">
                AI Speaking
              </span>
            </div>
            <div className="h-px bg-gray-200"></div>

            <div className="flex justify-center">
              <Timer timeLeft="30" totalTime="60" />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <span className="text-2xl font-bold text-blue-600">1</span>
                <span className="text-xs text-gray-400">Current Questions</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-blue-600">5</span>
                <span className="text-xs text-gray-400">Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text-section */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-d relative">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6">
            AI Interview Assistant
          </h2>

          <div className="relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              Question 1 of 5
            </p>
            <div className="text-base sm:text-lg font-semibold text-gray-800  leading-relaxed">
              First Question
            </div>
          </div>
          <textarea
            placeholder="Type your answer here..."
            className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
          />

          <div className="flex items-center gap-4 mt-6">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg"
            >
              <FaMicrophone size={20}/>
            </motion.button>
            <motion.button 
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-indigo-400 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold cursor-pointer">
              Submit Answer
            </motion.button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
