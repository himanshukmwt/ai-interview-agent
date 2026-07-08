import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getInterviewReport } from "../services/api";
import Report from "../components/Report";


function InterviewReport() {
  const {id}= useParams();
  const [report,setReport] =useState(null);

  useEffect(()=>{
    const fetchReport = async()=>{
      try{
      const result =await getInterviewReport(id);
      console.log(result.data);
      setReport(result.data);
    }catch(error){
      console.log(error);
    }
  }
  fetchReport();
  },[]);

  if(!report){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading Report...
        </p>
      </div>
    )
  }

  return (
    <Report report={report}/>
  )
}

export default InterviewReport