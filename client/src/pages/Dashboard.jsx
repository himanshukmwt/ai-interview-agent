import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalInterviews: 0,
    highestScore: 0,
    avgScore: 0,
    confidence: 0,
    communication: 0,
    correctness: 0,
    performanceGraph: [],
    recentInterviews: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getDashboard();
      console.log(res.data);
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

  const getBarColor = (score) => {
    if (score <= 3) return "#D85A30";
    if (score <= 6) return "#EF9F27";
    return "#63A46B";
  };

  const getScoreColor = (score) => {
    if (score <= 3) return "#D85A30";
    if (score <= 6) return "#EF9F27";
    return "#63A46B";
  };

  return (
    <div className="min-h-screen bg-[#F7F6FE] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="-ml-15 mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition cursor-pointer"
            >
              <FaArrowLeft className="text-gray-500" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <p className="text-gray-500 mt-2 pl-12 -ml-13">
            Track your interview performance over time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-xl font-semibold text-center text-[#8A8672]">
              Total Interviews
            </p>
            <p className="text-xl font-semibold text-center text-gray-600">
              {dashboard.totalInterviews}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-xl font-semibold text-center text-[#8A8672]">
              Avg Score
            </p>
            <p className="text-xl font-semibold text-center text-gray-600">
              {dashboard.avgScore.toFixed(2)}/10
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-xl font-semibold text-center text-[#8A8672]">
              Best Score
            </p>
            <p className="text-xl font-semibold text-center text-gray-600">
              {dashboard.highestScore.toFixed(2)}/10
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-xl font-semibold text-center text-[#8A8672]">
              Confidence
            </p>
            <p className="text-xl font-semibold text-center text-gray-600">
              {dashboard.confidence.toFixed(2)}/10
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-3">Performance Trend</h2>
            <div className="h-64 sm:h-50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboard.performanceGraph}>
                  <CartesianGrid stroke="#94A3B8" strokeDasharray="5 5" />
                  <XAxis dataKey="interview" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Skill Breakdown</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Confidence</span>
                  <span>{(dashboard.confidence * 10).toFixed(1)}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{
                      width: `${dashboard.confidence * 10}%`,
                      backgroundColor: getBarColor(dashboard.confidence),
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Communication</span>
                  <span>{(dashboard.communication * 10).toFixed(1)}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{
                      width: `${dashboard.communication * 10}%`,
                      backgroundColor: getBarColor(dashboard.communication),
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Correctness</span>
                  <span>{(dashboard.correctness * 10).toFixed(1)}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{
                      width: `${dashboard.correctness * 10}%`,
                      backgroundColor: getBarColor(dashboard.correctness),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Interviews</h2>

          {dashboard.recentInterviews.map((interview) => (
            <div
              key={interview._id}
              className="flex justify-between items-center py-4 border-b last:border-none"
            >
              <div>
                <p className="font-semibold text-gray-800">{interview.role}</p>
                <p className="text-sm text-gray-500">{interview.mode}</p>
              </div>

              <div className="text-right">
                <span
                  style={{
                    color: getScoreColor(interview.finalScore),
                    fontWeight: 500,
                  }}
                >
                  {interview.finalScore}/10
                </span>

                <p className="text-sm text-gray-500">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
