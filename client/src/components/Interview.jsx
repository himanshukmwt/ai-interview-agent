import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import { motion } from "motion/react";
import Timer from "./Timer";
import { FaArrowLeft, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { submitAns } from "../services/api";

function Interview({ interviewData, onFinish }) {
  const {interviewId, questions,userName}=interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef=useRef(null);
  const currentQuestion=questions[currentIndex];


  useEffect(()=>{
    const loadVoices=()=>{
      const voices=window.speechSynthesis.getVoices();
      if(!voices.length)return;

      //known female voices
      const femaleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("zira")||
          v.name.toLowerCase().includes("samantha")||
          v.name.toLowerCase().includes("female")
        );

        if(femaleVoice){
          setSelectedVoice(femaleVoice);
          setVoiceGender("female");
          return;
        }

        //known male voices
        const maleVoice=
          voices.find(v =>
          v.name.toLowerCase().includes("david")||
          v.name.toLowerCase().includes("mark")||
          v.name.toLowerCase().includes("male")
        );

        if(maleVoice){
          setSelectedVoice(maleVoice);
          setVoiceGender("male");
          return;
        }

        setSelectedVoice(voices[0]);
        setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged=loadVoices;
  },[]);

  const videoSource=voiceGender==="male"?maleVideo:femaleVideo;

  //speak function
  const speakText=(text)=>{
    return new Promise((resolve)=>{
      if(!window.speechSynthesis || !selectedVoice){
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText= text
          .replace(/,/g, ", ...")
          .replace(/\./g, ". ...");

      const utterance =new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      utterance.rate=0.92;
      utterance.pitch=1.05;
      utterance.volume=1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currntTime =0;
        setIsAIPlaying(false);
      
        if(isMicOn){
          startMic();
        }

      setTimeout(()=>{
        setSubtitle("");
        resolve();
      },300);
    };

    setSubtitle(text);

    window.speechSynthesis.speak(utterance);

    })
  };

  useEffect(()=>{
    if(!selectedVoice){
      return;
    }
    const runIntro=async()=>{
      if(isIntroPhase){
      await speakText(
        `Hi ${userName}, it's great to meet you today. I'll ask you a few questions, Just answer naturally, and take your time. let's begin`
      );
      setIsIntroPhase(false);

    }
    else if(currentQuestion){
      await new Promise(r => setTimeout(r,800));

      if(currentIndex === questions.length -1){
        await speakText("Alright, this one might be a bit more challenging");
      }
      await speakText(currentQuestion.question);

      if(isMicOn){
          startMic();
        }
    }
  }
  runIntro();
  },[selectedVoice , isIntroPhase , currentIndex]);

  useEffect(()=>{
    if(isIntroPhase)return;
    if(!currentQuestion)return;
    if(isSubmitting)return;

    const timer=setInterval(()=>{
      setTimeLeft((prev)=>{
        if(prev<=1){
          clearInterval(timer);
          return 0;
        }
        return prev-1;
      })
    },1000);

    return ()=>clearInterval(timer);
  },[isIntroPhase, currentIndex,isSubmitting]);


  useEffect(() => {
  if (!("webkitSpeechRecognition" in window)) return;

  const recognition = new window.webkitSpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript =
      event.results[event.results.length - 1][0].transcript;

    setAnswer((prev) => prev + " " + transcript);
  };

  recognitionRef.current = recognition;
}, []);


const startMic=()=>{
  if(recognitionRef.current && !isAIPlaying){
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.log(error);
    }
  }
}

const stopMic=()=>{
  if(recognitionRef.current){
    recognitionRef.current.stop();
  }
}

const toggleMic=()=>{
  if(isMicOn){
    stopMic();
  }
  else{
    startMic();
  }
  setIsMicOn(!isMicOn);
};

const submitAnswer=async()=>{
  if(isSubmitting)return;
  stopMic();
  setIsSubmitting(true);

  try{
    const result = await submitAns({
      interviewId,
      questionIndex:currentIndex,
      answer,
      timeTaken: currentQuestion.timeLimit-timeLeft
    });
    setFeedback(result.data.feedback);
    speakText(result.data.feedback);
    setIsSubmitting(false);
  }catch(error){
    console.log(error);
    setIsSubmitting(false);
  }
};

const handleNext=async()=>{
  setAnswer("");
  setFeedback("");

  if(currentIndex +1 >=questions.length){
    finishInterview();
    return;
  }

  await speakText("Alright,let's move to the next question.")

  setCurrentIndex(currentIndex+1);
  setTimeout(()=>{
    if(isMicOn)startMic();
  },500);
};



  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 via-white to-purple-300 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* video section */}
        <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video src={videoSource} 
                    key={videoSource}
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
            className="w-full h-auto object-cover" />
          </div>

          {/* subtitle */}
          {subtitle && (
            <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed">
                {subtitle}
              </p>

            </div>
          )}


          {/* timer */}
          <div className="w-full max-w-md bg-white border border-gary-200 rounded-2xl shadow-md p-6 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Interview Status</span>
              {isAIPlaying && (
                <span className="text-sm font-semibold text-indigo-400">
                {isAIPlaying ? "AI Speaking": ""}
              </span>)}
            </div>
            <div className="h-px bg-gray-200"></div>

            <div className="flex justify-center">
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <span className="text-2xl font-bold text-blue-600">{currentIndex+1}</span>
                <span className="text-xs text-gray-400">Current Questions</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-blue-600">{questions.length}</span>
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

          {!isIntroPhase && (<div className="relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              Question {currentIndex+1} of {questions.length}
            </p>
            <div className="text-base sm:text-lg font-semibold text-gray-800  leading-relaxed">
              {currentQuestion?.question}
            </div>
          </div>)}

          <textarea
            placeholder="Type your answer here..."
            onChange={(e)=>setAnswer(e.target.value)}
            value={answer}
            className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition text-gray-800"
          />

          {!feedback ? (<div className="flex items-center gap-4 mt-6">
            <motion.button
            onClick={toggleMic}
              whileTap={{ scale: 0.98 }}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg"
            >
             {isMicOn? <FaMicrophone size={20}/>:<FaMicrophoneSlash size={20}/>} 
            </motion.button>
            <motion.button 
            onClick={submitAnswer}
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-indigo-400 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold cursor-pointer disabled:bg-gray-500">
              {isSubmitting?"Submitting...":"Submit Answer"}
            </motion.button>

          </div>):(
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="mt-6 bg-amber-100 border border-indigo-400 p-5 rounded-2xl shadow-sm">
                <p className="text-gray-700 font-medium mb-4">{feedback}</p>
                <button className="w-full bg-blue-400 text-white py-3 rounded-xl flex items-center justify-center gap-1 shadow-md hover:opacity-90 transition ">
                  Next Question <FaArrowLeft size={18}/>
                </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
