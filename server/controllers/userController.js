import User from "../models/userModel";

export const getUser=async (res,res)=>{
    try {
        const userId=req.user._id;
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User doesn't found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:`Failed to get current user ${error}`});
    }
}