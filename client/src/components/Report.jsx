import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

function Report({ report }) {
  const navigate = useNavigate();
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    //////  title  //////
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);

    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center",
    });

    currentY += 5;

    // underline
    doc.setTextColor(59, 130, 246);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    // FINAL SCORE BOX //
    doc.setFillColor(240, 243, 254);

    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, {
      align: "center",
    });

    currentY += 30;

    //skill box
    doc.setFillColor(249, 250, 251);

    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);

    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);

    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    
    //advice //
    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);

    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);

    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    // Question Table //
    autoTable(doc, {
      startY: currentY,

      margin: {
        left: margin,
        right: margin,
      },

      head: [["#", "Question", "Score", "Feedback"]],

      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        // `${q.question}\n\nAnswer: ${q.answer || "Not submitted"}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),

      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },

      headStyles: {
        fillColor: [219,234,254],
        textColor: 0,
        halign: "center",
      },

      columnStyles: {
        0: { cellWidth: 10, halign: "center" }, // index
        1: { cellWidth: 55 }, // question
        2: { cellWidth: 20, halign: "center" }, // score
        3: { cellWidth: "auto" }, // feedback
      },

      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
    });

    doc.save("AI_Interview_Report.pdf");
  };

     const getBarColor = (score) => {
    if (score <= 3) return "#D85A30";
    if (score <= 6) return "#EF9F27";
    return "#63A46B";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-indigo-200 px-4 sm:px-6 lg:px-10 py-3.5">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 ">
        <div className="w-full flex items-start gap-4 flex-wrap">
          <button
            onClick={() => navigate("/history")}
            className="mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition cursor-pointer"
          >
            <FaArrowLeft className="text-gray-500" />
          </button>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex-nowrap">
              Interview Dashboard
            </h3>
            <p className="text-gray-500 mt-1">Performance</p>
          </div>
        </div>

        <button 
        onClick={downloadPDF}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 rounded-lg shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap cursor-pointer">
          Download PDF
        </button>
      </div>

      <div className="grid grid:cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3.5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:py-3 px-6 text-center"
          >
            <h3 className="text-gray-700 font-semibold mb-3 text-sm sm:text-base">
              Overall Performance
            </h3>
            <div className="relative w-20 h-20 sm:w-25 sm:h-25 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "20px",
                  pathColor: getBarColor(score),
                  textColor: "#000000",
                  trailColor: "#C0C0C0",
                })}
              />
            </div>

            <div className="mt-2">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {performanceText}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {shortTagline}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white roundec-2xl sm:rounded-3xl shadow-lg p-6 sm:py-4 px-8"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6 sm:mb-3">
              Skill Evaluation
            </h3>

            <div className="space-y-3">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>{s.label}</span>
                    <span className="font-semibold text-balck">{s.value}</span>
                  </div>

                  <div className="bg-gray-200 h-2 sm:h-3 rounded-full">
                    <div
                      className=" h-full rounded-full"
                      style={{ width: `${s.value * 10}%` ,
                        backgroundColor: getBarColor(s.value)}}
                      
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:px-6 py-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-5">
              Preformance Trend
            </h3>

            <div className="h-64 sm:h-55">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#4f46e5"
                    fill="#c7d2fe"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:px-8 py-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6 sm:mb-3">
              Questions
            </h3>
            <div className="space-y-5">
              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-4 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Question {i + 1}</p>

                      <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                        {q.question || "Question not available"}
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit">
                      {q.score ?? 0}/10
                    </div>
                  </div>
                  {/* <div>

                      <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                        {q.answer || "Answer not available"}
                      </p>
                    </div> */}

                  <div className="bg-blue-50 border border-indigo-200 p-4 sm:p-3 rounded-lg">
                    <p className="text-xs text-blue-500 font-semibold mb-1">
                      Feedback
                    </p>

                    <p className="text-sm text-gray leading-relaxed">
                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Report;
