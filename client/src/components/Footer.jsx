import { BsRobot } from "react-icons/bs";

function Footer() {
 return (
  <footer className="bg-gray-900 px-4 py-6">
    <div className=" max-w-6xl mx-auto ">
      
      
      <div className="flex justify-center items-center gap-3 mb-2">
        <div className="bg-indigo-500 text-white py-1 px-2 rounded-lg">
          <p className="text-sm font-semibold">IP</p>
        </div>
        <h2 className="font-semibold text-gray-300">InterviewPrep</h2>
      </div>

      <p className="text-gray-400 text-sm max-w-xl mx-auto text-center mb-4">
        AI-powered interview preparation platform designed to improve
        communication skills, technical depth and professional confidence.
      </p>

      <p className="text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} InterviewPrep All rights reserved.
      </p>

    </div>
  </footer>
);
}

export default Footer