import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:8007/api",
    withCredentials: true,  
});

export const register=(data)=> api.post("/auth/register",data);
export const login=(data)=>api.post("/auth/login",data);
export const logout=()=>api.post("/auth/logout")
export const currentUser=()=>api.get("/user/current-user");
export const resumeUPLOAD=(data)=>api.post("/interview/resume",data);
export const startInterview=(data)=>api.post("/interview/generate-questions",data);
export const submitAns=(data)=>api.post("/interview/submit-answer",data);

export default api;