import axios from "axios";

const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,  
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register=(data)=> api.post("/auth/register",data);
export const login=(data)=>api.post("/auth/login",data);
export const logout=()=>api.post("/auth/logout");
export const googleLogin=(data)=>api.post("/auth/google",data);
export const forgotPassword=(data)=>api.post("/auth/forgot-password",data);
export const verifyOtp=(data)=>api.post("/auth/verify-otp",data);
export const verifySignupOtp=(data)=>api.post("/auth/verify-signup-otp",data);
export const resetPassword=(data)=>api.post("/auth/reset-password",data);

export const currentUser=()=>api.get("/user/current-user");
export const resumeUPLOAD=(data)=>api.post("/interview/resume",data);
export const startInterview=(data)=>api.post("/interview/generate-questions",data);


export const submitAns=(data)=>api.post("/interview/submit-answer",data);
export const finishInterview=(data)=>api.post("/interview/finish",data);
export const getMyInterviews=()=>api.get("/interview/get-interview");
export const getInterviewReport=(id)=>api.get(`/interview/report/${id}`);
export const generateFollowUp = (data) =>api.post("/interview/follow-up", data);

export const getDashboard=()=>api.get("/dashboard");


export default api;