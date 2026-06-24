import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:8007/api",
    withCredentials: true,  
});

export const register=(data)=> api.post("/user/register",data);
export const login=(data)=>api.post("/user/login",data);

export default api;