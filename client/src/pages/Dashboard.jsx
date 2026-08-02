import {useEffect, useState} from 'react'
import { getDashboard } from '../services/api';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function Dashboard() {
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

    const[loading, setLoading]=useState(false);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async()=>{
        setLoading(true);
        console.log("fetchData called");
        try{
            const res=await getDashboard();
            console.log(res.data);
            setDashboard(res.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    };
    


  return (
    <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                Track your interview performance over time.
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <p className='text-xl font-semibold text-center'>
                        Total Interviews
                    </p>
                    <p className='text-xl font-md text-center'>
                        {dashboard.totalInterviews}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <p className='text-xl font-semibold text-center'>
                        Avg Score
                    </p>
                    <p className='text-xl font-md text-center'>
                        {dashboard.avgScore}%
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <p className='text-xl font-semibold text-center'>
                        Best Score
                    </p>
                    <p className='text-xl font-md text-center'>
                        {dashboard.highestScore}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <p className='text-xl font-semibold text-center'>
                        Confidence
                    </p>
                    <p className='text-xl font-md text-center'>
                        {dashboard.confidence}
                    </p>
                </div>
            </div>
            

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                <h2 className='text-2xl font-semibold mb-3'>
                    Performance Trend
                </h2>
                <div className="h-64 sm:h-50">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboard.performanceGraph}>
                    <CartesianGrid  stroke="#E5E7EB" strokeDasharray="5 5" />
                    <XAxis dataKey="interview" stroke="#E5E7EB" />
                    <YAxis  stroke="#E5E7EB" />
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
        </div>

        </div>
        
    </div>
  )
}

export default Dashboard