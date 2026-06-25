import { getUser } from "../services/authServices.js";

 const isAuth=(req,res,next)=>{
    const token=req.cookies?.uid;

    if(!token){
        return res.status(401).json({message:"Please login first"});
    }
    const user=getUser(token);
    if(!user){
        return res.status(401).json({message:"Invalid or Expired token"});
    }
    req.user=user;
    next();
}

export default isAuth;